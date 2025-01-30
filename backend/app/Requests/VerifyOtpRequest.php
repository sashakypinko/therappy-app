<?php

namespace App\Requests;

class VerifyOtpRequest extends Request
{
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer',
            'password' => 'required|min:6',
            'email' => 'required|email',
        ];
    }
}
