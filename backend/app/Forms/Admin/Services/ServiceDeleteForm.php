<?php

namespace App\Forms\Admin\Services;


use App\Forms\DeleteForm;
use App\Repositories\Services\ServicesRepository;
use Illuminate\Http\Response;

class ServiceDeleteForm extends DeleteForm
{
    /**
     * @param $result
     * @return object
     */
    public function __requestValid($result): object
    {
        $service = app(ServicesRepository::class)->destroy($this->id);

        return $this->response(['data' => 'Deleted Successfully'], Response::HTTP_OK);
    }
}
