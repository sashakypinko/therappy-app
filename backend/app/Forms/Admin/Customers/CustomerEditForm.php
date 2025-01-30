<?php

namespace App\Forms\Admin\Customers;

use App\Forms\BaseForm;
use App\Repositories\UserDetails\UserDetailsRepository;
use App\Repositories\Users\UsersRepository;
use Illuminate\Http\Response;

class CustomerEditForm extends BaseForm
{
    /**
     * @var string[]
     */
    protected array $rules = [
        'first_name' => 'required',
        'last_name' => 'required',
        'details.phone' => 'required',
        'details.gender' => 'required',
    ];

    public function __construct(
        UsersRepository $userService,
        UserDetailsRepository $detailService,
    )
    {
        $this->userService = $userService;
        $this->detailService = $detailService;
    }

    /**
     * @param $result
     * @return object
     */
    public function __requestValid($result): object
    {
        $this->saveUser()
            ->saveDetails();

        return $this->response($this->user, Response::HTTP_OK);
    }

    protected function saveUser(): static
    {
        $this->user = $this->userService->update($this->request->all(), $this->id);
        return $this;
    }

    protected function saveDetails(): static
    {
        $request = $this->request->all();
        $request = $request['details'];
        $request['user_id'] = $this->user->id;
        $this->user->details = $this->detailService->updateByUser($request, $this->user->id);

        return $this;
    }

}
