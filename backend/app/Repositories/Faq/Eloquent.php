<?php

namespace App\Repositories\Faq;

use App\Models\Faq;
use App\Models\Media;
use App\Services\Media\MediaService;
use Illuminate\Database\Eloquent\Collection;

class Eloquent implements FaqRepository
{
    /**
     * Model to be used.
     *
     * @var Faq
     */
    protected Faq $model;

    /**
     * Initialize Attributes
     *
     * @param Faq $model
     */
    public function __construct(Faq $model)
    {
        $this->model = $model;
    }

    /**
     * Fetches a resource by ID.
     *
     * @param $id
     *
     * @return Faq
     */
    public function byId($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Fetches a collection of the resource.
     *
     * @param array $request
     *
     * @return Collection
     */
    public function get(array $request = [])
    {
        return $this->model->get();
    }

    /**
     * Stores a resource.
     *
     * @param array $attributes
     *
     * @return Faq
     */
    public function store($attributes)
    {
        $model = clone $this->model;
        $model->fill($attributes);
        $model->save();

        return $model;
    }

    /**
     * @param array $attributes
     * @param int $id
     * @return Faq
     */
    public function update(array $attributes, int $id): Faq
    {
        $model = $this->byId($id);

        $model->fill($attributes);
        $model->save();

        $model->refresh();

        return $model;
    }

    /**
     * Destroys a resource.
     *
     * @param  $id
     * @return bool
     */
    public function destroy($id): bool
    {
        if(!$id) return false;

        $model = $this->byId($id);
        $model->delete();

        return true;
    }

    /**
     * Datatable Request
     *
     * @param array $request
     * @param boolean $total
     * @return mixed
     */
    public function datatable(array $request = [], bool $total = false): mixed
    {
        $builder = $this->model
            ->select([
                'faq.*'
            ]);

        $builder = $this->datatableLimit($builder, $request, $total);

        $builder = $builder
            ->groupBy('faq.id')
            ->get();

        return !$total ? $builder : $builder->count();
    }

    private function datatableLimit($query, $request, $total)
    {
        $offset = $request['offset'] ?? 0;
        $limit = $request['limit'] ?? 25;

        return $total ? $query : $query->offset($offset*$limit)->limit($limit);
    }

}
