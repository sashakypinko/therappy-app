<?php

namespace App\Forms\Admin\Customers;

use App\Forms\BaseGetForm;
use App\Repositories\Users\UsersRepository;
use Exception;

class CustomerGetForm extends BaseGetForm
{
    /**
     * @param int $id
     * @return CustomerGetForm
     */
    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @throws Exception
     */
    public function setData()
    {
        $service = app(UsersRepository::class)->byId($this->id);

        if (
            $service
        )
        {
            $this->data = [$service];
        } else {
            throw new Exception('You do not have access to the service.');
        }
    }
}
