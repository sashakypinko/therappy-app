<?php

namespace App\Repositories\Media;

use App\Models\Media;
use App\Requests\Request;
use App\Services\Media\MediaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Eloquent implements MediaRepository
{
    /**
     * Model to be used.
     *
     * @var Media
     */
    protected Media $model;

    /**
     * Service to be used.
     *
     * @var MediaService
     */
    protected MediaService $mediaService;

    /**
     * Initialize Attributes
     *
     * @param Media $model
     * @param MediaService $mediaService
     */
    public function __construct(Media $model, MediaService $mediaService)
    {
        $this->model = $model;
        $this->mediaService = $mediaService;
    }

    /**
     * Fetches a resource by ID.
     *
     * @param $id
     *
     * @return Media
     */
    public function byId($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Fetches a collection of the resource.
     *
     * @param array $request
     *
     * @return Collection
     */
    public function get(array $request = [])
    {
        return $this->model->get();
    }

    /**
     * Stores a resource.
     *
     * @param array $attributes
     *
     * @return Media
     */
    public function store($attributes)
    {
        $model = clone $this->model;
        $model->fill($attributes);
        $model->save();

        return $model;
    }

    /**
     * @param array $attributes
     * @param int $id
     * @return Media
     */
    public function update(array $attributes, int $id): Media
    {
        $model = $this->byId($id);
        if(!$this->mediaService->isHasPermission($model)) return $model;

        $model->fill($attributes);
        $model->save();

        $model->refresh();

        return $model;
    }

    /**
     * Upload media and store to db.
     *
     * @param $file
     * @param string $type
     * @param null $user_id
     * @return mixed|null
     */
    public function upload($file, string $type = Media::TYPE_PUBLIC, $user_id = null): mixed
    {
        if(!$file || !is_file($file)){
            return null;
        }

        $model = clone $this->model;
        $model->save();

        $attributes = $this->mediaService->storage($file, $type, $model->id);
        $attributes['user_id'] = $user_id;

        $model->fill($attributes);
        $model->save();
        $guessExtension = $file->guessClientExtension();
        $extension = $guessExtension !== 'bin' ? $guessExtension : $file->extension();
        $originalName = $file->getClientOriginalName();
        $filePath = $this->mediaService->getDirectory($this->mediaService->getName($model->id, $type, $extension));
        $fileName = $this->mediaService->getName($model->id, $type, $extension);
        Log::info("Model id: {$model->id}, File original name - {$originalName}, File name - {$fileName} File path - {$filePath}");
        return $model->id;
    }

    /**
     * Destroys a resource.
     *
     * @param  $id
     * @return bool
     */
    public function destroy($id): bool
    {
        if(!$id) return false;

        $model = $this->byId($id);
        if(!$model || !$this->mediaService->isHasPermission($model) ) return false;

        $this->mediaService->deleteFile($model);
        $model->delete();

        return true;
    }

    /**
     * Destroys a resource.
     *
     * @param  $id
     */
    public function deleteFile($id)
    {
        if(!$id) return;

        $model = $this->byId($id);
        $this->mediaService->deleteFile($model);
    }

    public function getMedia($id, array $request = [])
    {

        if(!$id) return $this->mediaService->getDefaultFile();
        $request['token'] = $request['token'] ?? '';

        $model = $this->byId($id);

        if( !$model || !( (int) $model->type === Media::TYPE_PUBLIC || $this->mediaService->isHasPermission($model) || $this->mediaService->compareTokens($request['token'], $model->token)) ){
            return $this->mediaService->getDefaultFile();
        }

        return $this->mediaService->getFile($model);
    }

    public function resizeMedia($path, array $request = [])
    {
        return  $this->mediaService->resizeMedia($path, $request);
    }



    /**
     * @param int $id
     * @return mixed
     */
    public function find(int $id)
    {
        return $this->model->find($id);
    }

}
