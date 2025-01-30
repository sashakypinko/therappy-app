<?php

namespace App\Repositories\LandingContent;

interface LandingContentRepository
{

    /**
     * @return mixed
     */
    public function get();

    /**
     * @param array $attributes
     * @return mixed
     */
    public function update(array $attributes);
}
