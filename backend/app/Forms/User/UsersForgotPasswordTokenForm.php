<?php

namespace App\Forms\User;

use App\Forms\BaseForm;
use App\Models\User;
use App\Repositories\Users\UsersRepository;

use ErrorException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class UsersForgotPasswordTokenForm extends BaseForm
{
    /**
     * @var string[]
     */
    protected array $rules = [
        'email' => 'required|email',
        'code' => 'required|numeric:4',
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
        $token = $this->getToken($request['email'], $request['code']);

        if(!$token){
            throw new ErrorException('Code doesn\'t match', 500);
        }

        return $this->response($token, Response::HTTP_OK);
    }

    protected function getToken($email, $code)
    {
        return DB::table('password_reset_tokens')->select('token')->where('email', $email)->where('code', $code)->first();
    }
}
