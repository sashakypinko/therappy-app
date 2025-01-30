<?php

namespace App\Http\Controllers\Api;

use App\Forms\Therapists\ServiceNotFoundForm;
use App\Forms\Therapists\TherapistDeleteForm;
use App\Forms\Therapists\TherapistEditBankForm;
use App\Forms\Therapists\TherapistEditForm;
use App\Forms\Therapists\TherapistGetBankForm;
use App\Forms\Therapists\TherapistGetForm;
use App\Handlers\Services\Classes\Datatable;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\Users\UsersRepository;
use App\Repositories\UserSchedulesOverrides\UserSchedulesOverridesRepository;
use App\Requests\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class TherapistsController extends Controller
{
    /**
     * Service Model
     *
     * @var UsersRepository
     */
    public UsersRepository $model;

    /**
     * @var UserSchedulesOverridesRepository
     */
    public UserSchedulesOverridesRepository $schedulesOverrides;

    /**
     * Initialize Attributes
     *
     * @param UsersRepository $model
     * @param UserSchedulesOverridesRepository $schedulesOverrides
     */
    public function __construct(UsersRepository $model, UserSchedulesOverridesRepository $schedulesOverrides)
    {
        $this->model = $model;
        $this->schedulesOverrides = $schedulesOverrides;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
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

    /**
     * @param $id
     * @return JsonResponse
     */
    public function update($id): JsonResponse
    {
        try {
            $result = app(TherapistEditForm::class)
                ->setId($id)
                ->run();

            return new JsonResponse($result->data, $result->code);
        } catch (\Exception $e) {
            Log::error('Generated error: ' . $e->getMessage());
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
            $result = app(TherapistDeleteForm::class)
                ->setModel(new User)
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

    /**
     * @param $id
     * @return JsonResponse
     */
    public function editBankDetails($id): JsonResponse
    {
        try {
            $result = app(TherapistEditBankForm::class)
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

    /**
     * @param $id
     * @return JsonResponse
     */
    public function getBankDetails($id): JsonResponse
    {
        try {
            $result = app(TherapistGetBankForm::class)
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


    /**
     * @return JsonResponse
     */
    public function serviceNotFound(): JsonResponse
    {
        try {
            $result = app(ServiceNotFoundForm::class)
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


    /**
     * @param int $id
     * @return JsonResponse
     */
    public function clearScheduleOverride(int $id): JsonResponse
    {
        try {
            $this->schedulesOverrides->deleteByUserId($id);

            return new JsonResponse('Schedule override cleared successfully', JsonResponse::HTTP_OK);

        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
