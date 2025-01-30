<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Media\MediaRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AttachmentsController extends Controller
{
    /**
     * Service Model
     *
     * @var MediaRepository
     */
    public MediaRepository $model;

    /**
     * Initialize Attributes
     *
     * @param MediaRepository $model
     */
    public function __construct(MediaRepository $model)
    {
        $this->model = $model;
    }

    /**
     * @param $id
     * @return BinaryFileResponse
     */
    public function get($id): BinaryFileResponse
    {
        try {
            $media = $this->model->getMedia($id);
            return response()->file($media);
            //return new JsonResponse($media, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->file(null);
        }
    }

    /**
     * @param $id
     * @return BinaryFileResponse
     */
    public function getMedia($id): BinaryFileResponse
    {
        try {
            $media = $this->model->getMedia($id);
            return response()->file($media);
            //return new JsonResponse($media, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->file(null);
        }
    }


}
