<?php

namespace App\Requests;

class ResendOtpRequest extends Request
{
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'old_id' => 'required|integer',
            'email' => 'required|email',
        ];
    }
}
