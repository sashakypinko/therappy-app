<?php

namespace App\Responses;

//use App\Libraries\MyMobileApi\Exceptions\MyMobileAppException;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ExceptionResponse implements Responsable
{
    private $exception;

    public function __construct($e)
    {
        $this->exception = $e;
    }

    public function toResponse($request)
    {
        $message = $this->exception->getMessage();
        $code = $this->exception->getCode();
        $error = 'Something went wrong.';

        if ($this->exception instanceof ModelNotFoundException) {
            $statusCode = Response::HTTP_NOT_FOUND;
            /*
        } elseif ($this->exception instanceof \Google_Service_Exception) {
            $error = 'Google Auth Error.';
            $statusCode = Response::HTTP_BAD_REQUEST;
        } elseif ($this->exception instanceof MyMobileAppException) {
            $error = 'Bad request.';
            $statusCode = Response::HTTP_BAD_REQUEST;
         */
        } elseif ($this->exception instanceof UnprocessableEntityHttpException) {
            $error = 'Unprocessable entity.';
            $statusCode = Response::HTTP_UNPROCESSABLE_ENTITY;
        } else {
            $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR;
        }

        return response()->json([
            'error' => $error,
            'message' => $message,
            'code' => $code
        ], $statusCode);
    }
}
