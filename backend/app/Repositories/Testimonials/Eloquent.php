<?php

namespace App\Repositories\Testimonials;


use App\Models\Testimonial;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Eloquent implements TestimonialsRepository
{
    private Testimonial $model;

    public function __construct(Testimonial $model)
    {
        $this->model = $model;
    }

    /**
     * @param $id
     * @param bool $withRelations
     * @return Collection|Model
     */
    public function byId($id, bool $withRelations = true): Model|Collection
    {
        if ($withRelations) {
            return $this->model
                ->with(['user'])
                ->findOrFail($id);
        }
        return $this->model->findOrFail($id);
    }

    /**
     * Stores a resource.
     *
     * @param  array $attributes
     * @return Testimonial
     */
    public function store(array $attributes): Testimonial
    {
        $model = clone $this->model;

        $model->fill($attributes);
        $model->save();

        return $model;
    }

    /**
     * Updates the Resource
     *
     * @param array $attributes
     * @param  $id
     * @return Collection|Model
     */
    public function update(array $attributes, $id): Model|Collection
    {
        $testimonial = $this->byId($id, false);

        $testimonial->fill($attributes);
        $testimonial->save();

        return $testimonial;
    }

    /**
     * Destroy a resource.
     *
     * @param  $id
     */
    public function destroy($id)
    {
        $user = $this->byId($id, false);
        $user->delete();
    }

    public function add($attributes): Testimonial
    {
        $user = auth()->user();
        User::where('id', $user->id)->update(['rate_us_at' => Carbon::now()->add(7, 'years')]);
        $attributes['user_id'] = $user->id;

        return $this->store($attributes);
    }

    public function remindLater()
    {
        $user = auth()->user();
        User::where('id', $user->id)->update(['rate_us_at' => Carbon::now()->add(5, 'days')]);
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
        $builder = Testimonial::select([
            '*'
        ])->with(['user']);

        $builder = $this->datatableLimit($builder, $request, $total);

        $builder = $builder
            ->groupBy('testimonials.id')
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
