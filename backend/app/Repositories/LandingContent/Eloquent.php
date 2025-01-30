<?php

namespace App\Repositories\LandingContent;

use App\Models\LandingContent;

class Eloquent implements LandingContentRepository
{

    /**
     * @var LandingContent
     */
    protected LandingContent $model;

    /**
     * @param LandingContent $model
     */
    public function __construct(LandingContent $model)
    {
        $this->model = $model;
    }

    /**
     * @return mixed
     */
    public function get(): mixed
    {
        return $this->model->query()->first();
    }

    /**
     * @param array $attributes
     * @return mixed
     */
    public function update(array $attributes): mixed
    {
        $model = $this->model->query()->first();

        if (!$model) {
            $model = clone $this->model;
        }

        $model->fill($attributes);
        $model->save();

        return $model;
    }
}
