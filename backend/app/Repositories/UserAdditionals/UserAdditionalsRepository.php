<?php

namespace App\Repositories\UserAdditionals;

interface UserAdditionalsRepository
{
    /**
     * Fetches a resource by id.
     *
     * @param  $id
     */
    public function byId($id);

    /**
     * Stores a resource.
     *
     * @param  array $attributes
     */
    public function store(array $attributes);

    /**
     * Update a resource.
     *
     * @param  array $attributes
     * @param  $id
     */
    public function update(array $attributes, $id);

    /**
     * Destroy a resource.
     *
     * @param  $id
     */
    public function destroy($id);

}
