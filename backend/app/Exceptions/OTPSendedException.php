<?php

namespace App\Exceptions;

class OTPSendedException extends \Exception
{
    public $otpId;

    public function __construct($otpId)
    {
        $this->otpId = $otpId;
        parent::__construct();
    }
}
