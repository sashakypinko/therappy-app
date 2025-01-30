<?php

namespace App\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class Request extends FormRequest
{
    public function validationData(): array
    {
        return array_merge(
            parent::all(),
            $this->route()->parameters()
        );
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            new JsonResponse($validator->errors()->getMessages(), JsonResponse::HTTP_UNPROCESSABLE_ENTITY)
        );
    }
}
