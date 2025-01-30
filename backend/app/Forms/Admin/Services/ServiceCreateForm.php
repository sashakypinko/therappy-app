<?php

namespace App\Forms\Admin\Services;

use App\Forms\BaseForm;
use App\Repositories\Services\ServicesRepository;
use Illuminate\Http\Response;

class ServiceCreateForm extends BaseForm
{
    /**
     * @var string[]
     */
    protected array $rules = [
        'name' => 'required',
        'description' => 'required',
      //  'image' => 'required|mimes:jpeg,png',
        'category_id' => 'required',
        'status' => 'required',
        'price' => 'required|numeric|min:0',
        'duration' => 'required|integer|gt:0'
    ];

    /**
     * @param $result
     * @return object
     */
    public function __requestValid($result): object
    {
        $attributes = $this->request->all();

        $actionPlan = app(ServicesRepository::class)->store($attributes);

        return $this->response($actionPlan, Response::HTTP_OK);
    }

}
