<?php

namespace App\Forms\Admin\Customers;

use App\Forms\BaseForm;
use App\Repositories\Testimonials\TestimonialsRepository;
use Illuminate\Http\Response;

class TestimonialCreateForm extends BaseForm
{
    /**
     * @var string[]
     */
    protected array $rules = [
        'comment' => 'required',
        'rating_therapist' => 'required|numeric|min:0|max:5',
        'rating_platform' => 'required|numeric|min:0|max:5',
        'rating_general' => 'required|numeric|min:0|max:5',
    ];

    /**
     * @param $result
     * @return object
     */
    public function __requestValid($result): object
    {
        $attributes = $this->request->all();

        $actionPlan = app(TestimonialsRepository::class)->add($attributes);

        return $this->response($actionPlan, Response::HTTP_OK);
    }

}
