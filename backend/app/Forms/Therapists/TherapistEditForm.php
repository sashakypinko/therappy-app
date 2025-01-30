<?php

namespace App\Forms\Therapists;

use App\Forms\BaseForm;
use App\Models\Media;
use App\Models\User;
use App\Repositories\Media\MediaRepository;
use App\Repositories\Services\ServicesRepository;
use App\Repositories\UserAdditionals\UserAdditionalsRepository;
use App\Repositories\UserDetails\UserDetailsRepository;
use App\Repositories\Users\UsersRepository;
use App\Repositories\UserSchedules\UserSchedulesRepository;
use App\Repositories\UserSchedulesOverrides\UserSchedulesOverridesRepository;
use ErrorException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class TherapistEditForm extends BaseForm
{
    /**
     * @var string[]
     */
    protected array $rules = [
        /*
        'details.phone' => 'required',
        'details.gender' => 'required',
        'details.description' => 'required',
        'details.address' => 'required',
        */
    ];

    public function __construct(
        UsersRepository $userService,
        UserDetailsRepository $detail,
        MediaRepository $mediaService,
        ServicesRepository $serviceService,
        UserSchedulesRepository $schedulesService,
        UserSchedulesOverridesRepository $schedulesOverridesService,
        UserAdditionalsRepository $additionalService,
    )
    {
        $this->userService = $userService;
        $this->detail = $detail;
        $this->mediaService = $mediaService;
        $this->serviceService = $serviceService;
        $this->schedulesService = $schedulesService;
        $this->schedulesOverridesService = $schedulesOverridesService;
        $this->additionalService = $additionalService;
        $this->details = '';
    }

    /**
     * @param $result
     * @return object
     * @throws ErrorException
     */
    public function __requestValid($result): object
    {
        if(!$this->checkPermissions()){
            throw new ErrorException('Permission error', 500);
        }

        $this->saveUser()
            ->saveDetails()
            ->saveAttachments()
            ->saveServices()
            ->saveSchedule()
            ->saveScheduleOverrides()
            ->saveAdditionals();

        return $this->response($this->user->load(['details']), Response::HTTP_OK);
    }

    protected function checkPermissions(): bool
    {
        return $this->userService->checkPermissions($this->id);
    }

    protected function saveUser(): static
    {
        $this->user = $this->userService->update($this->request->all(), $this->id);
        return $this;
    }

    protected function saveDetails(): static
    {
        $request = $this->request->all();
        if(!isset($request['details'])) return $this;
        $request = $request['details'];

        $request['user_id'] = $this->user->id;
        $this->detail->updateByUser($request, $this->user->id);

        return $this;
    }

    protected function saveAttachments(): static
    {
        $request = $this->request->all();
        if(!isset($request['uploads'])) return $this;
        $uploads = $request['uploads'] ?? [];

        foreach($uploads as $file){
            $this->mediaService->upload($file, Media::TYPE_ATTACHMENT, $this->user->id);
        }

        return $this;
    }

    protected function saveServices(): static
    {
        $request = $this->request->all();
        if(!isset($request['services'])) return $this;

        if( $this->user->status === User::STATUS_APPROVED){
            $this->user->update(['status' => User::STATUS_ACTIVE]);
        }

        $services = $request['services'] ?? [];
        $user_services = $this->user->services()->pluck('service_id')->toArray() ?? [];

        foreach($user_services as $service_id){
            if( !in_array($service_id, $services) ) {
                $this->serviceService->detachService($service_id, $this->user->id);
            }
        }
        foreach($services as $service_id){
            if(!in_array($service_id, $user_services)){
                $this->serviceService->attachService($service_id, $this->user->id);
            }
        }

        return $this;
    }

    protected function saveSchedule(): static
    {
        $request = $this->request->all();
        if(!isset($request['schedule'])) return $this;

        $schedule = $request['schedule'] ?? [];
        $this->user->schedule = $this->schedulesService->updateByUser($schedule, $this->user->id);

        return $this;
    }

    protected function saveScheduleOverrides(): static
    {
        $request = $this->request->all();
        if(!isset($request['schedule_overrides'])) return $this;

        $schedule = $request['schedule_overrides'] ?? [];
        $this->user->schedule_overrides = $this->schedulesOverridesService->updateByUser($schedule, $this->user->id);

        return $this;
    }



    protected function saveAdditionals(): static
    {
        $request = $this->request->all();
        if(!isset($request['additionals'])) return $this;

        $additionals = $request['additionals'] ?? [];
        $this->user->additionals = $this->additionalService->updateByUser($additionals, $this->user->id);

        return $this;
    }

}
