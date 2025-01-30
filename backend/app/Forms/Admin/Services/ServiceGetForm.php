<?php

namespace App\Forms\Admin\Services;

use App\Forms\BaseGetForm;
use App\Repositories\Services\ServicesRepository;
use Exception;

class ServiceGetForm extends BaseGetForm
{
    /**
     * @param int $id
     * @return ServiceGetForm
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
        $service = app(ServicesRepository::class)->byId($this->id);

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
