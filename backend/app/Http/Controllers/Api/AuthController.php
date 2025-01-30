<?php

namespace App\Http\Controllers\Api;

use App\Forms\User\UsersForgotPasswordForm;
use App\Forms\User\UsersForgotPasswordTokenForm;
use App\Http\Controllers\Controller;
use App\Requests\ForgotPasswordRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function getEmptyResponse()
    {
        return response()->json([
            'status' => true,
            'message' => 'OK',
        ], 200);
     }
    /**
     * Create User
     * @param Request $request
     * @return JsonResponse
     */
    public function createUser(Request $request): JsonResponse
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(),
                [
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required'
                ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $request = $request->all();
            $user = $this->authService->createUser($request);

            Auth::login($user);
           // Auth::attempt(['email' => $request->email, 'password' => $request->password]);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'auth' => Auth::user()
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return JsonResponse
     */
    public function loginUser(Request $request): JsonResponse
    {
        try {
            $validateUser = Validator::make($request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = $this->authService->getUserByEmail($request->email);

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'auth' => Auth::user()
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function sendResetPasswordCode(ForgotPasswordRequest $request, AuthService $authService): JsonResponse
    {
        $email = $request->get('email');

        try {
            $authService->sendForgotPasswordMail($email);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => ['message' => $e->getMessage()]], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return $this->getEmptyResponse();
    }

    public function getResetPasswordToken(Request $request): JsonResponse
    {
        try {
            $result = app(UsersForgotPasswordTokenForm::class)
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

    public function resetPassword(Request $request): JsonResponse
    {
        try {
            $result = app(UsersForgotPasswordForm::class)
                ->run();
            $user = $result->data;

            Auth::login($user);

            return response()->json([
                'status' => true,
                'message' => 'Password changed Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'auth' => Auth::user()
            ], 200);

        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function signUpWithGoogle(Request $request): JsonResponse
    {
        try {
            $request = $request->all();
            $googleInfo = $this->authService->getInfoFromGoogle($request['token']);

            $user = $this->authService->getUserByEmail($googleInfo['email']);

            if(!$user){
                $googleInfo['type'] = $request['type'] ?? null;
                $googleInfo['first_name'] = $googleInfo['given_name'];
                $googleInfo['last_name'] = $googleInfo['family_name'];
                $googleInfo['social_media'] = 1;

                $user = $this->authService->createUser($googleInfo);
            }

            Auth::login($user);

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'auth' => Auth::user()
            ], 200);


        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAuthUser(): JsonResponse
    {
        try {
            $user = auth()->user()->load(['details']);

            return response()->json(
                $user
            , 200);

        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


}
