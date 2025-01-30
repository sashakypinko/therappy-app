<?php

namespace App\Forms\Therapists;

use App\Forms\BaseGetForm;
use App\Repositories\Users\UsersRepository;
use App\Repositories\UserSchedules\UserSchedulesRepository;
use Exception;

class TherapistGetBankForm extends BaseGetForm
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
        $user = app(UsersRepository::class)->byId($this->id)->load(['bank_details']);

        if (
            $user
        )
        {
            $user = $user->toArray();
            $this->data = $user['bank_details'] ?? [];
        } else {
            throw new Exception('You do not have access to the user.');
        }
    }
}
