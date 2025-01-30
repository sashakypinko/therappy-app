<?php

namespace App\Repositories\UserBankDetails;

interface UserBankDetailsRepository
{
    /**
     * Fetches a resource by id.
     *
     * @param  $id
     */
    public function byId($id);

    /**
     * @param $id
     * @return mixed
     */
    public function byUserId($id);

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

    /**
     * Updates the Resource
     *
     * @param array $attributes
     * @param $userId
     */
    public function updateByUser(array $attributes, $userId);

}


