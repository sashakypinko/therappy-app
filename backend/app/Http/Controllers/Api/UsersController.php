<?php

namespace App\Http\Controllers\Api;

use App\Forms\User\UsersGetForm;
use App\Handlers\Services\Classes\Datatable;
use App\Http\Controllers\Controller;
use App\Repositories\Users\UsersRepository;
use App\Responses\ExceptionResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Forms\User\UsersGetUsersForm;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * Initialize Attributes
     *
     * @param UsersRepository $model
     */
    public function __construct(UsersRepository $model)
    {
        $this->model = $model;
    }

    public function sendVerificationCode(Request $request): JsonResponse
    {
        try {
            app(UsersRepository::class)->sendVerificationCode($request->all());
        } catch (\Exception $e) {
            return new JsonResponse(['error' => ['message' => $e->getMessage()]], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        return new JsonResponse(['message' => 'Verification sent'], Response::HTTP_OK);
    }

    /**
     * @return JsonResponse|ExceptionResponse
     */
    public function get()
    {
        try {
            $form = app()->make(UsersGetForm::class);

            $result = $form->run();

            return new JsonResponse($result->data, $result->code);
        } catch (\Exception $e) {
            return new ExceptionResponse($e);
        }
    }

    /**
     * @return JsonResponse|ExceptionResponse
     */
    public function getUsers()
    {
        try {
            $form = app()->make(UsersGetUsersForm::class);

            $result = $form->run();

            return new JsonResponse($result->data, $result->code);
        } catch (\Exception $e) {
            return new ExceptionResponse($e);
        }
    }

    public function subscribeOnLaunch(Request $request): JsonResponse
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(),
                [
                    'email' => 'required|email|unique:users,email',
                ]);
            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            app(UsersRepository::class)->subscribeOnLaunch($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Data collected'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function applyVerificationCode($id, $code): JsonResponse|ExceptionResponse
    {
        try {
            if($this->model->applyVerificationCode($id, $code)){
                $token = '';
                if(!auth()->user()){
                    Auth::loginUsingId($id);
                    $token = Auth::user()->createToken("API TOKEN")->plainTextToken;
                }

                return response()->json([
                    'status' => true,
                    'message' => 'Email verification passed',
                    'auth' => Auth::user(),
                    'token' => $token
                ], Response::HTTP_OK);
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Email verification failed'
                ], Response::HTTP_SERVICE_UNAVAILABLE);
            }
        } catch (\Exception $e) {
            return new ExceptionResponse($e);
        }
    }

    public function getDiscoverQuestions()
    {
        try {
            $result = $this->model->getDiscoverQuestions();

            return response()->json($result, Response::HTTP_OK);
        } catch (\Exception $e) {
            return new ExceptionResponse($e);
        }
    }

    public function answerDiscoverQuestions(Request $request): JsonResponse|ExceptionResponse
    {
        try {
            $result = $this->model->answerDiscoverQuestions($request->all());

            return response()->json($result, Response::HTTP_OK);
        } catch (\Exception $e) {
            return new ExceptionResponse($e);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function getReviews(Request $request): JsonResponse
    {
        try {
            $request = $request->all();
            $result = (new Datatable($this->model, $request, 'datatableReviews'))->run();

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
    public function getReviewCounters($id): JsonResponse
    {
        try {
            $counters = $this->model->getReviewCounters($id);

            return new JsonResponse($counters, Response::HTTP_OK);
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
    public function setNewStatus($id): JsonResponse
    {
        try {
            $this->model->setNewStatus($id);

            return new JsonResponse(['message' => 'Success'], Response::HTTP_OK);
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
    public function setApprovedStatus($id): JsonResponse
    {
        try {
            $this->model->setApprovedStatus($id);

            return new JsonResponse(['message' => 'Success'], Response::HTTP_OK);
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
    public function setActiveStatus($id): JsonResponse
    {
        try {
            $this->model->setActiveStatus($id);

            return new JsonResponse(['message' => 'Success'], Response::HTTP_OK);
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
    public function setDeclinedStatus($id): JsonResponse
    {
        try {
            $this->model->setDeclinedStatus($id);

            return new JsonResponse(['message' => 'Success'], Response::HTTP_OK);
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
    public function setDeletedStatus($id): JsonResponse
    {
        try {
            $this->model->setDeletedStatus($id);

            return new JsonResponse(['message' => 'Success'], Response::HTTP_OK);
        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



}
