<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\LandingContent\LandingContentRepository;
use App\Requests\Request;
use App\Responses\ExceptionResponse;
use Illuminate\Http\JsonResponse;

class LandingContentController extends Controller
{
    /**
     * @param LandingContentRepository $model
     */
    public function __construct(LandingContentRepository $model)
    {
        $this->model = $model;
    }

    /**
     * @return JsonResponse|ExceptionResponse
     */
    public function get(): JsonResponse|ExceptionResponse
    {
        try {
            return new JsonResponse($this->model->get(), JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new ExceptionResponse($e);
        }
    }

    /**
     * @return JsonResponse|ExceptionResponse
     */
    public function update(Request $request): JsonResponse|ExceptionResponse
    {
        try {
            return new JsonResponse($this->model->update($request->json()->all()), JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new ExceptionResponse($e);
        }
    }
}
