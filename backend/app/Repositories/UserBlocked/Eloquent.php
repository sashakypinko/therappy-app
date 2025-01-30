<?php

namespace App\Repositories\UserBlocked;

use App\Models\User;
use App\Models\UserBlocked;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Eloquent implements UserBlockedRepository
{
	/**
	 * User Model
	 *
	 * @var UserBlocked
	 */
	protected UserBlocked $model;


    /**
     * Initialize Attributes
     *
     * @param UserBlocked $model
     */
    public function __construct(UserBlocked $model)
	{
		$this->model = $model;
	}

    /**
     * @param $id
     * @return Collection|Model
     */
	public function byId($id): Model|Collection
    {
        return $this->model->findOrFail($id);
	}

    /**
     * @param $id
     * @param $targetID
     * @return mixed
     */
    public function byUserIdAndTargetId($id, $targetID): mixed
    {
        return $this->model->where('user_id', $id)->where('target_id', $targetID)->first();
    }

	/**
	 * Stores a resource.
	 *
	 * @param  array $attributes
	 * @return UserBlocked
	 */
	public function store(array $attributes): UserBlocked
    {
        $details = clone $this->model;

        $details->fill($attributes);
        $details->save();

		return $details;
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
        $details = $this->byId($id);

        $details->fill($attributes);
        $details->save();

        return $details;
    }

    /**
     * Destroy a resource.
     *
     * @param  $id
     */
	public function destroy($id)
    {
        $details = $this->byId($id);
        $details->delete();
	}

    /**
     * @throws Exception
     */
    public function blockUser($attributes): bool
    {
        $user = auth()->user();
        $attributes['target_id'] = $attributes['target_id'] ?? 0;

        $blockedUser = User::findOrFail($attributes['target_id']);
        $blockedFlag = $attributes['block'] ?? 0;

        if(!$user || !$blockedUser || $blockedUser->type !== User::TYPE_CLIENT) throw new Exception('Wrong User.');

        $model = $this->byUserIdAndTargetId($user->id, $blockedUser->id);
        if(!$blockedFlag){
            $model->delete();
        }else{
            $attributes['user_id'] = $user->id;
            $model = $model ?? clone $this->model;
            $model->fill($attributes);
            $model->save();
        }

        return true;
    }

    public function checkUser($attributes) // therapist checks is customer blocked or customer checks is he blocked
    {
        $user = auth()->user();
        $isTherapistChecks = $attributes['isTherapistChecks'] ?? 1;
        $isTherapistChecks = (int) $isTherapistChecks === 1 ?: 0;
        $idForCheck = $attributes['user_id'] ?? 0;

        $userId = $isTherapistChecks ? $user->id : $idForCheck;
        $targetId = $isTherapistChecks ? $idForCheck : $user->id;

        $model = $this->byUserIdAndTargetId($userId, $targetId);

        if($model) return true;

        return false;
    }

    /**
     * Datatable Blocked Users Request
     *
     * @param array $request
     * @param boolean $total
     * @return mixed
     */
    public function datatable(array $request = [], bool $total = false): mixed
    {
        $user = auth()->user();

        $builder = $this->model
            ->select([
                'user_blocked.*'
            ])->with(['blocked'])->where('user_id', $user->id);

        //return $builder->toSql();
        $builder = $this->datatableLimit($builder, $request, $total);

        $builder = $builder
            ->groupBy('user_blocked.id')
            ->get();

        return !$total ? $builder : $builder->count();
    }

    private function datatableLimit($query, $request, $total)
    {
        $offset = $request['offset'] ?? 0;
        $limit = $request['limit'] ?? 25;

        return $total ? $query : $query->offset($offset*$limit)->limit($limit);
    }
}
