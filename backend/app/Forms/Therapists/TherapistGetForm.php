<?php

namespace App\Forms\Therapists;

use App\Forms\BaseGetForm;
use App\Repositories\Users\UsersRepository;
use App\Repositories\UserSchedules\UserSchedulesRepository;
use Exception;

class TherapistGetForm extends BaseGetForm
{
    /**
     * @param int $id
     * @return TherapistGetForm
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
            $service = $service->toArray();
            $service['schedule'] = $service['schedule'] ? app(UserSchedulesRepository::class)->formatScheduleForWeb($service['schedule']) : [];
            $this->data = [$service];
        } else {
            throw new Exception('You do not have access to the service.');
        }
    }
}
