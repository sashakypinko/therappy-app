<?php

namespace App\Forms;

abstract class BaseGetForm extends BaseForm
{
    /**
     * @var array
     */
    protected array $data = [];

    /**
     * @param $validation
     *
     * @return object
     */
    public function __requestValid($validation)
    {

        $this->setData();
        return $this->response($this->data, 200);
    }

    abstract protected function setData();
}
