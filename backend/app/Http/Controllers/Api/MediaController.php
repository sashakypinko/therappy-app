<?php

namespace App\Http\Controllers\Api;

use App\Forms\Therapists\TherapistDeleteForm;
use App\Forms\Therapists\TherapistEditForm;
use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\User;
use App\Repositories\Media\MediaRepository;
use App\Requests\Request;
use ErrorException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MediaController extends Controller
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
     * @param Request $request
     * @return JsonResponse|mixed|BinaryFileResponse
     */
    public function get($id, Request $request): mixed
    {
        try {
            $request = $request->all();

            $media = $this->model->getMedia($id, $request);
            try {
                $img = $this->model->resizeMedia($media, $request);

                return $img->response($img->extension);
            } catch (\Exception $e) {
                return response()->file($media);
            }
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $request = $request->all();
            $this->model->update($request, $id);

            return new JsonResponse(['message' => 'The file has been updated'], Response::HTTP_OK);
        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        try {
            if(!$this->model->destroy($id)){
                throw new ErrorException('Permission error', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return new JsonResponse(['message' => 'The file has been deleted'], Response::HTTP_OK);
        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


}
