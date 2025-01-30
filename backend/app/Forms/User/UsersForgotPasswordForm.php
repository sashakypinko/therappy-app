<?php

namespace App\Forms\User;

use App\Forms\BaseForm;
use App\Models\User;
use App\Repositories\Users\UsersRepository;

use ErrorException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class UsersForgotPasswordForm extends BaseForm
{
    /**
     * @var string[]
     */
    protected array $rules = [
        'reset_password_token' => 'required',
        'password' => 'required',
        'confirm_password' => 'required',
    ];

    public function __construct(UsersRepository $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @param $result
     * @return object
     * @throws ErrorException
     */
    public function __requestValid($result): object
    {
        $request = $this->request->all();
        $userId = $this->getUserIdByToken($request['reset_password_token']);

        if(!$userId){
            throw new ErrorException('Wrong token', 500);
        }

        if(!$this->checkPasswords($request['password'], $request['confirm_password'])){
            throw new ErrorException('Passwords doesn\'t match', 500);
        }
        $this->setId($userId)->saveUser();

        return $this->response($this->user, Response::HTTP_OK);
    }

    protected function saveUser(): static
    {
        $this->user = $this->userService->update(['password' => $this->request->get('password')], $this->id);
        return $this;
    }

    protected function checkPasswords($pass, $confirmPass): bool
    {
        return $pass === $confirmPass;
    }

    protected function getUserIdByToken($token): int
    {
        $email = DB::table('password_reset_tokens')->select('email')->where('token', $token)->first();

        if(!$email) return 0;

        $user = $this->userService->getUserByEmail($email->email);

        return $user ? $user->id : 0;
    }
}
