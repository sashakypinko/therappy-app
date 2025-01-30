<?php

namespace App\Repositories\UserDetails;

use App\Models\Media;
use App\Models\UserDetails;
use App\Repositories\Media\MediaRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Eloquent implements UserDetailsRepository
{
	/**
	 * User Model
	 *
	 * @var UserDetails
	 */
	protected UserDetails $model;

    /**
     * Media Repository
     *
     * @var MediaRepository
     */
    protected MediaRepository $mediaService;

    /**
     * Initialize Attributes
     *
     * @param UserDetails $model
     * @param MediaRepository $mediaService
     */
    public function __construct(UserDetails $model, MediaRepository $mediaService)
	{
		$this->model = $model;
        $this->mediaService = $mediaService;
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
	 * @return UserDetails
	 */
	public function store(array $attributes): UserDetails
    {
        $details = clone $this->model;

        $file = $attributes['image'] ?? '';
        $attributes['image_id'] =  $this->mediaService->upload($file, Media::TYPE_PUBLIC);

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
        $this->mediaService->destroy($details->image_id);
	}

    /**
     * @param UserDetails $details
     * @param array $attributes
     * @return UserDetails
     */
    protected function save(UserDetails $details, array $attributes): UserDetails
    {
        $oldMediaId = $details->image_id;
        $file = $attributes['image'] ?? '';
        $attributes['image_id'] = $this->mediaService->upload($file, Media::TYPE_PUBLIC);
        if(is_null($attributes['image_id'])) unset($attributes['image_id']);

        $details->fill($attributes);
        $details->save();

        if(isset($attributes['image_id'])){
            $this->mediaService->destroy($oldMediaId);
        }

        return $details;
    }
}
