<?php

namespace App\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailRequest extends FormRequest
{

    /**
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * @return string[]
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|integer',
            'to' => 'required|array',
            'subject' => 'required|string',
            'message' => 'required|string'
        ];
    }
}
