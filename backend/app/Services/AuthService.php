<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Users\UsersRepository;
use App\Services\Mail\MailService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AuthService
{
    const GOOGLE_INFO = 'https://www.googleapis.com/oauth2/v3/userinfo';

    /**
     * Mail
     *
     * @var MailService
     */
    protected MailService $mailService;

    /**
     * @param MailService $mailService
     */
    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    public function validatePassword(string $email, string $password): User
    {
        $user = $this->getUser($email);
        $passwordIsCorrect = Hash::check($password, $user->password);

        if ($passwordIsCorrect) {
            return $user;
        }

        throw new RuntimeException('Auth Error');
    }

    /**
     * @throws Exception
     */
    public function sendForgotPasswordMail($email): void
    {
        $user = $this->getUser($email);
        if(!$user) throw new Exception('User not found.');

        $code = mt_rand(0,9).mt_rand(0,9).mt_rand(0,9).mt_rand(0,9);
        $token = $this->generateRandomString(50);
        DB::table('password_reset_tokens')->where('email', $email)->delete();
        DB::table('password_reset_tokens')->insert(['email' => $email, 'token' => $token, 'code' => $code, 'created_at' => Carbon::now()]);

        $this->mailService->forgotPassword($user, $code);
    }

    /**
     * @throws Exception
     */
    public function sendVerificationCode($email): void
    {
        app(UsersRepository::class)->sendVerificationCode(['email' => $email]);
    }

    public function getUser(string $email): User
    {
        $user = User::where('email', $email)->first();

        if (empty($user)) {
            throw new RuntimeException('User not Found');
        }
/*
        if (!$user->isActive()) {
            throw new RuntimeException('User is inactive');
        }
*/
        return $user;
    }

    /**
     * @throws Exception
     */
    function generateRandomString($length = 10): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }


    /**
     * @throws Exception
     */
    public function createUser($attributes)
    {
        $type = isset($attributes['type']) ? ( (int) $attributes['type'] === User::TYPE_THERAPIST ? User::TYPE_THERAPIST : User::TYPE_CLIENT ) : User::TYPE_CLIENT;
        $attributes['password'] = $attributes['password'] ?? $this->generateRandomString();

        $user = User::create([
            'first_name' => $attributes['first_name'],
            'last_name' => $attributes['last_name'],
            'type' => $type,
            'email' => $attributes['email'],
            'email_verified_at' => isset($attributes['social_media']) ? Carbon::now() : null,
            'password' => Hash::make($attributes['password'])
        ]);

        if(isset($attributes['social_media'])){
            $user->email_verified_at = Carbon::now();
            $user->save();
        }else{
            $this->sendVerificationCode($user->email);
        }

        $user->refresh();

        return $user;
    }

    public function getUserByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    /**
     * @throws Exception
     */
    public function getInfoFromGoogle($token){
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, self::GOOGLE_INFO.'?access_token='.$token);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Timeout in seconds
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);

        $result = curl_exec($ch);
        $result = json_decode($result, true);
        if($result && isset($result->error_description)){
            throw new Exception($result->error_description, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $result;

    }
}
