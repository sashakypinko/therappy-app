<?php

namespace App\Forms\User;

//use App\Handlers\Services\Classes\Datatable;
use App\Forms\BaseGetForm;
use App\Handlers\Services\Classes\Datatable;
use App\Models\User;
use App\Repositories\User\UserRepository;
use App\Repositories\Users\UsersRepository;
use Illuminate\Validation\UnauthorizedException;

class UsersGetUsersForm extends BaseGetForm
{
    private $model;

    /**
     * Initialize Attributes
     *
     * @param UsersRepository $model
     */
    public function __construct(UsersRepository $model)
    {
        $this->model = $model;
    }

    protected function setData()
    {
        if ($this->user->isUserType([User::TYPE_ADMIN], $this->user->id)) {
            $users = (new Datatable($this->model, $this->request, 'datatableForMobileApi'))->run();
            foreach ($users['data'] as $user) {
                $user->setHidden([
                    'user_export_settings',
                    'single_sign_on',
                    'structure_type',
                    'timezone',
                    'thumbnail_url',
                    'website_profile_photo',
                ]);
            }
        } else {
            throw new UnauthorizedException('No permission.', 403);
        }

        $this->data = $users;
    }
}
