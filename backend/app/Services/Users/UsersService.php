<?php

namespace App\Services\Users;

use App\Models\User;

class UsersService
{
    const VERIFICATION_CODE_SALT = 'G3&ger@k!5g';

    public function __construct()
    {
    }

    public function checkVerificationCode($email, $code): bool
    {
        return $code === $this->getVerificationCode($email);
    }

    public function getVerificationCode($email): string
    {
        return substr(md5(self::VERIFICATION_CODE_SALT.$email), 0, 20);
    }
}
