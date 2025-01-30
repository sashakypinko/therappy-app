<?php

namespace App\Repositories\Orders;


use App\Models\Order;
use App\Services\DataTableService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Eloquent implements OrdersRepository
{
    private Order $model;

    const DATATABLE_TYPE = 'orders';

    /**
     * Data Table Service
     *
     * @var DataTableService
     */
    protected DataTableService $dataTableService;

    public function __construct(Order $model, DataTableService $dataTableService)
    {
        $this->model = $model;
        $this->dataTableService = $dataTableService;
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
     * @return Order
     */
    public function store(array $attributes): Order
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
        $model = $this->byId($id, false);

        $model->fill($attributes);
        $model->save();

        return $model;
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

    public function createOrder($items, $payment): Order
    {
        $user = auth()->user();

        $attributes['user_id'] = $user->id;
        $attributes['items'] = $items;
        $attributes['amount'] = $payment->amount;
        $attributes['payment_intent_id'] = $payment->id;

        return $this->store($attributes);
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
        $builder = Order::select([
            '*'
        ])->with(['user']);

        $builder = $this->dataTableService->datatableOrderBy($builder, $request, self::DATATABLE_TYPE);
        $builder = $this->dataTableService->datatableLimit($builder, $request, $total);

        $builder = $builder
            ->groupBy('appointment_orders.id')
            ->get();

        return !$total ? $builder : $builder->count();
    }


}
