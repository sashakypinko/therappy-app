<?php

namespace App\Forms\Therapists;


use App\Forms\DeleteForm;
use App\Repositories\Users\UsersRepository;
use Illuminate\Http\Response;

class TherapistDeleteForm extends DeleteForm
{
    /**
     * @param $result
     * @return object
     */
    public function __requestValid($result): object
    {
        app(UsersRepository::class)->destroy($this->id);

        return $this->response(['data' => 'Deleted Successfully'], Response::HTTP_OK);
    }
}
