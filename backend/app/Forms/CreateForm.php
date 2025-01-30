<?php

namespace App\Forms;

class CreateForm extends BaseForm
{

    /**
     * @param $validation
     * @return object
     */
    public function __requestValid($validation)
    {
        $data = array_merge(
            $this->request->all(),
            [$this->createdByFieldName => $this->request->user_id]
        );

        $record = $this->model->create($data);

        return (object)['data' => $record, 'code' => 200];
    }
}
