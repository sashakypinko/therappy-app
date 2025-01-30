<?php

namespace App\Repositories\UserBankDetails;

use App\Models\Media;
use App\Models\UserBankDetails;
use App\Models\UserDetails;
use App\Repositories\Media\MediaRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Eloquent implements UserBankDetailsRepository
{
	/**
	 * User Model
	 *
	 * @var UserBankDetails
	 */
	protected UserBankDetails $model;


    /**
     * Initialize Attributes
     *
     * @param UserBankDetails $model
     */
    public function __construct(UserBankDetails $model)
	{
		$this->model = $model;
	}

    /**
     * @param $id
     * @return UserBankDetails
     */
	public function byId($id): UserBankDetails
    {
        return $this->model->findOrFail($id);
	}

    /**
     * @param $id
     * @return mixed
     */
    public function byUserId($id): mixed
    {
        return $this->model->where('user_id', $id)->first();
    }

	/**
	 * Stores a resource.
	 *
	 * @param  array $attributes
	 * @return UserBankDetails
	 */
	public function store(array $attributes): UserBankDetails
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

        return $this->save($details, $attributes);
    }

    /**
     * Updates the Resource
     *
     * @param array $attributes
     * @param $userId
     * @return Collection|Model
     */
    public function updateByUser(array $attributes, $userId): Model|Collection
    {
        $details = $this->byUserId($userId);
        if(!$details) return $this->store($attributes);

        return $this->save($details, $attributes);
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
     * @param UserBankDetails $details
     * @param array $attributes
     * @return UserBankDetails
     */
    protected function save(UserBankDetails $details, array $attributes): UserBankDetails
    {
        $details->fill($attributes);
        $details->save();

        return $details;
    }
}
