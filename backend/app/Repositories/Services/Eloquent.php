<?php

namespace App\Repositories\Services;

use App\Models\Media;
use App\Models\Service;
use App\Models\User;
use App\Repositories\Media\MediaRepository;
use App\Services\DataTableService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Eloquent implements ServicesRepository
{
    const DATATABLE_TYPE = 'services';
	/**
	 * Contact Email Model
	 *
	 * @var Service
	 */
	protected Service $service;

    protected MediaRepository $mediaService;

    /**
     * Data Table Service
     *
     * @var DataTableService
     */
    protected DataTableService $dataTableService;

    /**
     * Initialize Attributes
     *
     * @param Service $service
     * @param MediaRepository $mediaService
     * @param DataTableService $dataTableService
     */
    public function __construct(Service $service, MediaRepository $mediaService, DataTableService $dataTableService)
	{
		$this->service = $service;
        $this->mediaService = $mediaService;
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
            return $this->service
                ->with(['category'])
                ->findOrFail($id);
        }
        return $this->service->findOrFail($id);
	}

    /**
     * @param $id
     * @return mixed
     */
    public function getServicesByCategoryId($id): mixed
    {
        return $this->service::where('category_id', $id)->get();
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
        $builder = $this->service
            ->select([
                'services.*'
            ])->with(['category']);

        $builder = $this->datatableFilter($builder, $request);
        $builder = $this->datatableSearch($builder, $request);
        $builder = $this->dataTableService->datatableOrderBy($builder, $request, self::DATATABLE_TYPE);
        $builder = $this->dataTableService->datatableLimit($builder, $request, $total);

        $builder = $builder
            ->groupBy('services.id')
            ->get();

        return !$total ? $builder : $builder->count();
    }

	/**
	 * Stores a resource.
	 *
	 * @param  array $attributes
	 * @return Service
	 */
	public function store(array $attributes): Service
    {
        $service = clone $this->service;

        $file = $attributes['image'] ?? '';
        $attributes['image_id'] =  $this->mediaService->upload($file, Media::TYPE_PUBLIC);

        $service->fill($attributes);
        $service->save();

		return $service;
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
        $service = $this->byId($id, false);

        $oldMediaId = $service->image_id;
        $file = $attributes['image'] ?? '';
        $attributes['image_id'] =  $this->mediaService->upload($file, Media::TYPE_PUBLIC);

        $service->fill($attributes);
        $service->save();

        $this->mediaService->destroy($oldMediaId);

        return $service;
    }

    public function getUserServices(User $user): \Illuminate\Database\Eloquent\Relations\MorphToMany
    {
        return $user->services();
    }

    public function detachService($service_id, $user_id)
    {
        DB::table('user_services')->where('user_id', $user_id)->where('service_id', $service_id)->delete();
    }

    public function attachService($service_id, $user_id)
    {
        DB::table('user_services')->insert(['service_id' => $service_id, 'user_id' => $user_id, 'user_type' => 'App\Models\User']);
    }

    /**
     * Destroy a resource.
     *
     * @param  $id
     */
	public function destroy($id)
    {
        $service = $this->byId($id, false);
        $service->delete();
        $this->mediaService->destroy($service->image_id);
	}

    private function datatableFilter($query, $request)
    {
        $query->when(isset($request['filter']['status']) && $request['filter']['status'] !== '',
            function ($query) use ($request) {
                return $query->where('services.status', $request['filter']['status']);
            })
            ->when(isset($request['filter']['date']) && $request['filter']['date'] !== '',
                function ($query) use ($request) {
                    return $query->whereRaw("DATE(services.created_at) = '" . date('Y-m-d',
                            strtotime($request['filter']['date'])) . "'");
                })
            ->when(!empty($request['filter']['category']),
                function ($query) use ($request) {
                    return $query->where('services.category_id', $request['filter']['category']);
                });

        return $query;
    }

    private function datatableSearch($query, $request)
    {
        $value = $request['search']['value'] ?? '';
        if($value !== '') {
            $query->where(function ($query) use ($value, $request) {
                $query->where('services.name', 'LIKE', '%' . $value . '%');
            });
        }

        return $query;
    }

}
