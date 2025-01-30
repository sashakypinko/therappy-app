<?php

namespace App\Forms;

class GetByIdForm extends BaseForm
{

    protected $id;

    protected $model;

    /**
     * @return string[]
     */
    public function __createValidations()
    {
        return [
            'user_id' => 'required|integer'
        ];
    }

    /**
     * @param $validation
     * @return object
     */
    public function __requestValid($validation)
    {
        $this->setTeamIds();

        $record = $this->model->where('id', $this->id)
            ->whereIn($this->createdByFieldName, $this->teamIds)
            ->first();

        if (!$record) {
            return (object)['data' => 'Not Found', 'code' => 404];
        }

        return (object)['data' => $record, 'code' => 200];
    }
    /**
     * @param int $id
     * @return $this
     */
    public function setId(int $id): GetByIdForm
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @param $model
     * @return $this
     */
    public function setModel($model): GetByIdForm
    {
        $this->model = $model;

        return $this;
    }

}
