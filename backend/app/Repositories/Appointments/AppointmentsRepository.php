<?php

namespace App\Repositories\Appointments;

interface AppointmentsRepository
{
    /**
     * Fetches a resource by id.
     *
     * @param  $id
     * @param bool $withRelations
     */
    public function byId($id, bool $withRelations = true, $with = []);

    /**
     * Datatable Request
     *
     * @param  array $request
     * @param boolean $total
     */
    public function datatable(array $request = [], bool $total = false);

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
