<?php

namespace App\Handlers\Services\Classes;

use App\Repositories\Services\ServicesRepository;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

class Datatable
{
	/**
	 * Repo Model to be used
	 *
	 * @var ServicesRepository
	 */
	protected $model;

	/**
	 * Request Data
	 *
	 * @var Request
	 */
	protected Request|array $request;

	/**
	 * Columns to be set.
	 *
	 * @var array
	 */
	protected array $columns = [];

	/**
	 * Data Mapping to be Returned
	 *
	 * @var Collection
	 */
	protected $data;

	/**
	 * Method of the model to be called
	 *
	 * @var string
	 */
	protected $method;

	/**
	 * Data total.
	 *
	 * @var integer
	 */
	protected $total;

    /**
     * @var array|Request
     */
    protected $requestData;

    /**
	 * Initialize Attributes
	 *
	 * @var  Object
	 * @var  Request | array $request
	 * @var  $method $method
	 */
	public function __construct($model, $request, string $method = 'datatable', $withAmount = false)
	{
        $this->requestData = $request instanceof Request ? $request->all() : $request;
        $this->model       = $model;
        $this->request     = $request;
        $this->method      = $method;
	}

    /**
     * Runs the Service
     *
     * @return array
     * @throws Exception
     */
	public function run()
	{
		return $this->validate()
		            ->getData()
		            ->getDataTotal()
		            ->generateReturn();
	}

	/**
	 * Validate Attributes
	 */
	protected function validate()
	{
		if(!$this->model)
		{
			throw new Exception('Please set a model repository in the constructor', 400);
		}

		return $this;
	}

    /**
     * Get Paginated Data
     *
     * @return $this
     * @throws Exception
     */
	protected function getData()
	{
		if(method_exists($this->model, $this->method))
		{
			$this->data = $this->model->{$this->method}($this->requestData);
			return $this;
		}

		throw new Exception(sprintf('Datatable Exception: method %s on the given model does not exist.', $this->method));
	}

	/**
	 * Get Total Number of Data
	 *
	 * @return $this
	 */
	protected function getDataTotal()
	{
		$this->total = $this->model->{$this->method}($this->requestData, true);
		return $this;
	}

	/**
	 * Returns datatables.net Array Structure
	 *
	 * @return array
	 */
	protected function generateReturn()
	{
		return [
			'recordsTotal'    => $this->total,
			'data'            => $this->data
		];
	}
}
