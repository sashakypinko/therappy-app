<?php

namespace App\Repositories\Faq;

interface FaqRepository
{

    /**
     * Fetches a resource by id.
     *
     * @param  $id
     */
    public function byId($id);

    /**
     * Datatable Request
     *
     * @param  array $request
     * @param boolean $total
     */
    public function datatable(array $request = [], bool $total = false);

    public function destroy($id);

}
