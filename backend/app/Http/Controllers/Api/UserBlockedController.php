<?php

namespace App\Http\Controllers\Api;

use App\Forms\Therapists\TherapistGetForm;
use App\Handlers\Services\Classes\Datatable;
use App\Http\Controllers\Controller;
use App\Models\User;

use App\Repositories\UserBlocked\UserBlockedRepository;
use App\Requests\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class UserBlockedController extends Controller
{
    /**
     * Service Model
     *
     * @var UserBlockedRepository
     */
    public UserBlockedRepository $model;

    /**
     * Initialize Attributes
     *
     * @param UserBlockedRepository $model
     */
    public function __construct(UserBlockedRepository $model)
    {
        $this->model = $model;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getList(Request $request): JsonResponse
    {
        try {
            $result = (new Datatable($this->model, $request))->run();

            return new JsonResponse($result, Response::HTTP_OK);
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
     * @return JsonResponse
     */
    public function blockUser(Request $request): JsonResponse
    {
        try {
            $request = $request->all();
            $result = $this->model->blockUser($request);

            return new JsonResponse($result, Response::HTTP_OK);
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
     * @return JsonResponse
     */
    public function checkUser(Request $request): JsonResponse
    {
        try {
            $request = $request->all();
            $result = $this->model->checkUser($request);

            return new JsonResponse($result, Response::HTTP_OK);
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
    public function get($id): JsonResponse
    {
        try {
            $result = app(TherapistGetForm::class)
                ->setId($id)
                ->run();

            return new JsonResponse($result->data, $result->code);
        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
