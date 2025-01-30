<?php

namespace App\Repositories\Users;


use App\Mail\OnLaunchEmail;
use App\Models\AppointmentReview;
use App\Models\User;
use App\Models\UserDetails;
use App\Models\UserDiscoverTherapy;
use App\Repositories\Media\MediaRepository;
use App\Requests\Request;
use App\Services\DataTableService;
use App\Services\Mail\MailService;
use App\Services\Users\UsersService;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class Eloquent implements UsersRepository
{
    const DATATABLE_TYPE = 'users';
    /**
     * User Model
     *
     * @var User
     */
    protected User $model;

    /**
     * Media Repository
     *
     * @var MediaRepository
     */
    protected MediaRepository $mediaService;

    /**
     * Media Repository
     *
     * @var UsersService
     */
    protected UsersService $usersService;

    /**
     * Mail
     *
     * @var MailService
     */
    protected MailService $mailService;

    /**
     * Data Table Service
     *
     * @var DataTableService
     */
    protected DataTableService $dataTableService;

    /**
     * Initialize Attributes
     *
     * @param User $model
     * @param MediaRepository $mediaService
     * @param UsersService $usersService
     * @param MailService $mailService
     * @param DataTableService $dataTableService
     */
    public function __construct(User $model, MediaRepository $mediaService, UsersService $usersService, MailService $mailService, DataTableService $dataTableService)
    {
        $this->model = $model;
        $this->mediaService = $mediaService;
        $this->usersService = $usersService;
        $this->mailService = $mailService;
        $this->dataTableService = $dataTableService;
    }

    /**
     * @param $id
     * @param bool $withRelations
     * @return Collection|Model
     */
    public function byId($id, bool $withRelations = true): Model|Collection
    {
        if ($withRelations) {
            return $this->model
                ->with(['details', 'attachments', 'schedule', 'services', 'additionals.media', 'schedule_overrides'])
                ->findOrFail($id);
        }
        return $this->model->findOrFail($id);
    }

    /**
     * @param $id
     * @param bool $withRelations
     * @return Collection|Model
     */
    public function getUserByEmail($email): Model|Collection
    {
        return $this->model->where('email', $email)->first();
    }

    /**
     * Datatable Request
     *
     * @param array $request
     * @param boolean $total
     * @return mixed
     */
    public function datatable(array $request = [], bool $total = false): mixed
    {
        $builder = $this->model
            ->select([
                'users.*'
            ])->with(['details', 'services', 'additionals.media']);

        $builder = $this->datatableFilter($builder, $request);
        $builder = $this->datatableSearch($builder, $request);
        $builder = $this->dataTableService->datatableOrderBy($builder, $request, self::DATATABLE_TYPE);
        $builder = $this->dataTableService->datatableLimit($builder, $request, $total);

        $builder = $builder
            ->groupBy('users.id')
            ->get();

        return !$total ? $builder : $builder->count();
    }

    /**
     * Stores a resource.
     *
     * @param array $attributes
     * @return User
     */
    public function store(array $attributes): User
    {
        $user = clone $this->model;
        $user->fill($attributes);
        $user->save();

        return $user;
    }

    /**
     * Updates the Resource
     *
     * @param array $attributes
     * @param  $id
     * @return Collection|Model
     */
    public function update(array $attributes, $id): Model|Collection
    {
        $user = $this->byId($id, false);

        if(!$user->isAdmin()) {
            unset($attributes['status']);
            unset($attributes['type']);
        }

        if(!isset($attributes['status']) && $user->status === User::STATUS_NEW || $user->status === User::STATUS_DECLINED){
            $attributes['status'] = User::STATUS_PENDING;
        }

        $user->fill($attributes);
        $user->save();

        if (isset($attributes['details'])) {
            if ($user->details) {
                $user->details->fill($attributes['details']);
                $user->details->save();
            } else {
                $userDetails = new UserDetails($attributes['details']);
                $user->details()->save($userDetails);
            }
        }
        return $user;
    }

    /**
     * Destroy a resource.
     *
     * @param  $id
     */
    public function destroy($id)
    {
        $user = $this->byId($id, false);
        $user->delete();
    }

    public function checkPermissions($user_id): bool
    {
        $user = auth('api')->user();
        if ($user->isAdmin() || $user_id === $user->id) return true;

        return false;
    }

    private function datatableFilter($query, $request)
    {
        $query->when(isset($request['filter']['status']) && $request['filter']['status'] !== '',
            function ($query) use ($request) {
                return $query->where('users.status', $request['filter']['status']);
            })
            ->when(isset($request['filter']['date']) && $request['filter']['date'] !== '',
                function ($query) use ($request) {
                    return $query->whereRaw("DATE(users.created_at) = '" . date('Y-m-d',
                            strtotime($request['filter']['date'])) . "'");
                })
            ->when(isset($request['filter']['type']) && $request['filter']['type'] !== '',
                function ($query) use ($request) {
                    return $query->where('users.type', $request['filter']['type']);
                });

        return $query;
    }

    private function datatableSearch($query, $request)
    {
        $value = $request['search']['value'] ?? '';
        if ($value !== '') {
            $query->where(function ($query) use ($value, $request) {
                $query->where(DB::raw("CONCAT(first_name, ' ', last_name)"), 'LIKE', "%$value%");
            });
        }

        return $query;
    }

    // type (client - 1, therapist - 2)
    public function subscribeOnLaunch(array $request)
    {
        $request['type'] = $request['type'] ?? 1;
        DB::table('subscribe_on_launch')->insert(['email' => $request['email'], 'type' => $request['type'], 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()]);

        $this->mailService->onLaunchSubscribe($request);
    }

    public function sendVerificationCode(array $request)
    {
        $email = $request['email'] ?? '-';
        $user = $this->getUserByEmail($email);
        if (!$user) throw new Exception('User not found.');

        $code = $this->usersService->getVerificationCode($email);

        $this->mailService->verificationCode($user, $code);
    }

    /**
     * @throws Exception
     */
    public function applyVerificationCode($id, $code): bool
    {
        $user = $this->byId($id, false);
        if (!$user) throw new Exception('User not found.');

        if ($this->usersService->checkVerificationCode($user->email, $code)) {
            $user->email_verified_at = Carbon::now();
            $user->save();

            return true;
        }

        return false;
    }

    public function getDiscoverQuestions()
    {
        $answer = UserDiscoverTherapy::where(['user_id' => auth()->user()->id])->first();
        $answer = ($answer && isset($answer->answer)) ? $answer->answer : null;

        return ['answer' => $answer, 'questions' => UserDiscoverTherapy::QUESTIONS];
    }

    public function answerDiscoverQuestions(array $request)
    {
        $answer = UserDiscoverTherapy::where(['user_id' => auth()->user()->id])->first();
        if ($answer) return $answer;

        $answerVariant = $request['answer'] ?? 0;
        $text = $request['text'] ?? 0;
        $answer = new UserDiscoverTherapy();
        $answer->fill(['user_id' => auth()->user()->id, 'answer' => $answerVariant, 'text' => $text]);
        $answer->save();

        return $answer;
    }

    public function getReviewCounters($id)
    {
        $user = $this->byId($id, false);

        return ['reviews_count' => $user->reviews_count(), 'rating' => $user->rating()];
    }

    /**
     * @throws Exception
     */
    public function setNewStatus($id)
    {
        $currentUser = auth('api')->user();
        if (!($currentUser->isAdmin() || $currentUser->id === $id)) throw new Exception('Wrong User.');
        $user = $this->byId($id, false);
        if (!$user) throw new Exception('User not found.');
        if (!($user->status === User::STATUS_DECLINED || $user->status === User::STATUS_PENDING)) throw new Exception('Wrong status.' . $user->status);

        $user->status = User::STATUS_NEW;
        $user->save();
    }

    /**
     * @throws Exception
     */
    public function setApprovedStatus($id)
    {
        $user = $this->byId($id, false);
        if (!$user) throw new Exception('User not found.');

        $user->status = User::STATUS_APPROVED;
        $user->save();
    }

    /**
     * @throws Exception
     */
    public function setActiveStatus($id)
    {
        $user = $this->byId($id, false);
        if (!$user) throw new Exception('User not found.');

        $user->status = User::STATUS_ACTIVE;
        $user->save();
    }

    /**
     * @throws Exception
     */
    public function setDeclinedStatus($id)
    {
        $user = $this->byId($id, false);
        if (!$user) throw new Exception('User not found.');

        $user->status = User::STATUS_DECLINED;
        $user->save();
    }

    /**
     * @throws Exception
     */
    public function setDeletedStatus($id)
    {
        $user = $this->byId($id, false);
        if (!$user) throw new Exception('User not found.');

        $user->status = User::STATUS_DELETED;
        $user->save();
    }

    /**
     * Datatable Request
     *
     * @param array $request
     * @param boolean $total
     * @return mixed
     */
    public function datatableReviews(array $request = [], bool $total = false): mixed
    {
        $builder = AppointmentReview::select([
            'appointment_reviews.*'
        ])->with(['user'])->where('target_id', $request['target_id']);

        $builder = $this->dataTableService->datatableLimit($builder, $request, $total);

        $builder = $builder
            ->groupBy('appointment_reviews.id')
            ->get();

        return !$total ? $builder : $builder->count();
    }

    public function checkAddressIsset($user, $attributes)
    {
        if (($user->details && !$user->details->address) || !$user->details) {
            $attr = ['details' => [
                'latitude' => $attributes['latitude'],
                'longitude' => $attributes['longitude'],
                'address' => $attributes['address'],
                'address_description' => $attributes['address_description'],
            ]];
            $this->update($attr, $user->id);
        }
    }
}
