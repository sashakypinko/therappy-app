<?php

namespace App\Forms;

abstract class BaseGetListForm extends BaseForm
{
    /**
     * @var int
     */
    protected int $minLimit = 1;

    /**
     * @var int
     */
    protected int $maxLimit = 1000;

    /**
     * @var integer
     */
    protected int $limit;

    /**
     * @var integer
     */
    protected int $offset;

    /**
     * @var bool|null
     */
    protected ?bool $withTotal;

    /**
     * @var bool|null
     */
    protected ?bool $onlyTotal;

    /**
     * @var integer|null
     */
    protected ?int $total;

    /**
     * @var array
     */
    protected array $data = [];

    /**
     * Validations for this Request
     *
     * @return array
     */
    public function __createValidations(): array
    {
        return array_merge(
            parent::__createValidations(),
            [
                'limit' => 'sometimes|integer|min:' . $this->minLimit,
                'offset' => 'sometimes|integer|min:0',
                'withTotal' => 'sometimes|in:0,1',
                'onlyTotal' => 'sometimes|in:0,1',
            ],
            $this->rules
        );
    }

    /**
     * Request is valid
     *
     * @param $validation
     * @return object
     */
    public function __requestValid($validation): object
    {
        $this->setLimit();
        $this->setOffset();
        $this->setWithTotal();
        $this->setOnlyTotal();

        $this->setData($this->getAttributesArray());

        return $this->response($this->data, 200);
    }

    public function setLimit(int $limit = null)
    {
        $this->limit = (int) ($limit ?? $this->request->get('limit') ?? $this->maxLimit);
        return $this;
    }

    public function setOffset(int $offset = null)
    {
        $this->offset = (int) ($offset ?? $this->request->get('offset') ?? 0);
        return $this;
    }

    /**
     * @param bool $withTotal
     * @return $this
     */
    public function setWithTotal(bool $withTotal = null)
    {
        $this->withTotal = (bool)($withTotal ?? $this->withTotal ?? $this->request->get('withTotal'));

        return $this;
    }

    /**
     * @param bool $onlyTotal
     * @return $this
     */
    public function setOnlyTotal(bool $onlyTotal = null)
    {
        $this->onlyTotal = (bool)($onlyTotal ?? $this->onlyTotal ?? $this->request->get('onlyTotal'));

        return $this;
    }

    /**
     * @param $builder
     * @return int|null
     */
    public function setTotal($builder)
    {
        $this->total = $builder->count();
        return $this->total;
    }

    /**
     * @param $builder
     * @return mixed
     */
    public function paginate($builder)
    {
        return $builder
            ->offset($this->offset ?? 0)
            ->limit($this->limit ?? $this->maxLimit)
            ->get();
    }

    /**
     * @param $builder
     */
    public function setPaginatedData($builder)
    {
        if ($this->withTotal) {
            $this->data['total'] = $this->setTotal($builder);
        }
        if (!$this->onlyTotal) {
            $this->data['data'] = $this->paginate($builder);
        }
    }

    public function getData()
    {
        return $this->data;
    }

    abstract public function setData(array $attributes = []);
}
