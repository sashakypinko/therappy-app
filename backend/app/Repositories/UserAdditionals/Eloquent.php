<?php

namespace App\Repositories\UserAdditionals;

use App\Models\Additional;
use App\Models\Media;
use App\Models\UserAdditional;
use App\Repositories\Media\MediaRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Eloquent implements UserAdditionalsRepository
{
    /**
     * User Model
     *
     * @var UserAdditional
     */
    protected UserAdditional $model;

    /**
     * Media Repository
     *
     * @var MediaRepository
     */
    protected MediaRepository $mediaService;

    /**
     * Initialize Attributes
     *
     * @param UserAdditional $model
     * @param MediaRepository $mediaService
     */
    public function __construct(UserAdditional $model, MediaRepository $mediaService)
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
        return $this->model->where('user_id', $id)->get();
    }

    /**
     * Stores a resource.
     *
     * @param array $attributes
     * @return UserAdditional
     */
    public function store(array $attributes): UserAdditional
    {
        $additional = clone $this->model;

        $attributes['user_id'] = $attributes['user_id'] ?? null;

        $file = $attributes['file'] ?? '';
        $attributes['media_id'] = $this->mediaService->upload($file, 'private', $attributes['user_id']);

        $additional->fill($attributes);
        $additional->save();

        return $additional;
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
        $additional = $this->byId($id);

        $oldMediaId = 0;
        $attributes['checked'] = $attributes['checked'] ?? 0;
        if (isset($attributes['file'])) {
            $oldMediaId = $additional->media_id;
            $file = $attributes['file'] ?? '';
            $attributes['media_id'] = $this->mediaService->upload($file, 'private', $additional->user_id);
        }

        $additional->fill($attributes);
        $additional->save();

        if ($oldMediaId) $this->mediaService->destroy($oldMediaId);

        return $additional;
    }

    public function updateModel($additional, array $attributes): Model|Collection
    {
        $oldMediaId = 0;
        $attributes['checked'] = $attributes['checked'] ?? 0;

        if (!((int)$attributes['checked']) && $additional->media_id) {
            $this->mediaService->destroy($additional->media_id);
        }

        if (isset($attributes['filename']) && $attributes['filename'] && $additional->media_id) {
            $this->mediaService->update(['name' => $attributes['filename']], $additional->media_id);
        }

        if (isset($attributes['file']) && is_file($attributes['file'])) {
            $oldMediaId = $additional->media_id;
            $file = $attributes['file'] ?? '';
            $attributes['media_id'] = $this->mediaService->upload($file, Media::TYPE_ADDITIONAL, $additional->user_id);
        }
        $additional->fill($attributes);
        $additional->save();

        if ($oldMediaId) $this->mediaService->destroy($oldMediaId);

        return $additional;
    }

    /**
     * Updates the Resource
     *
     * @param array $additionals
     * @param $userId
     * @return array
     */
    public function updateByUser(array $additionals, $userId): array
    {
        $userAdditionals = $this->byUserId($userId);

        $this->updateOtherAdditional($additionals, $userId);
        unset($additionals[Additional::OTHER_ADDITIONAL_ID]);

        foreach ($userAdditionals as $add) {
            if (isset($additionals[$add->additional_id])) {
                $this->updateModel($add, $additionals[$add->additional_id]);
                unset($additionals[$add->additional_id]);
            }
        }

        foreach ($additionals as $key => $add) {
            $add['user_id'] = $userId;
            $add['additional_id'] = $key;
            $this->store($add);
        }

        return $this->formatAdditionalForWeb($this->byUserId($userId)->toArray());
    }

    /**
     * Updates the Resource
     *
     * @param array $additionals
     * @param int $userId
     */
    public function updateOtherAdditional(array $additionals, int $userId)
    {
        if (!isset($additionals[Additional::OTHER_ADDITIONAL_ID])) {
            $this->model->where('additional_id', Additional::OTHER_ADDITIONAL_ID)->delete();
            return;
        }

        $additionalIds = array_map(function ($item) {
            if (!isset($item['id'])) {
                return 0;
            }
            return $item['id'];
        }, $additionals[Additional::OTHER_ADDITIONAL_ID]);

        $this->model
            ->where('additional_id', Additional::OTHER_ADDITIONAL_ID)
            ->whereNotIn('id', $additionalIds)
            ->delete();

        foreach ($additionals[Additional::OTHER_ADDITIONAL_ID] as $additional) {
            if (isset($additional['id'])) {
                if (isset($additional['filename']) && $additional['filename'] && $additional['media_id']) {
                    $this->mediaService->update(['name' => $additional['filename']], $additional['media_id']);
                }

                continue;
            }

            $additional['user_id'] = $userId;
            $additional['additional_id'] = Additional::OTHER_ADDITIONAL_ID;
            $this->store($additional);
        }
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
        $this->mediaService->destroy($details->media_id);
    }

    public function formatAdditionalForWeb(array $additionals): array
    {
        $formattedAdditional = [];
        foreach ($additionals as $item) {
            $formattedAdditional[$item['additional_id']] = $item;
        }

        return $formattedAdditional;
    }

}
