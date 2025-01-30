<?php

namespace App\Forms\Therapists;

use App\Forms\EditForm;
use App\Repositories\UserBankDetails\UserBankDetailsRepository;
use App\Repositories\Users\UsersRepository;
use ErrorException;
use Exception;
use Illuminate\Http\Response;

class TherapistEditBankForm extends EditForm
{
    /**
     * @var string[]
     */
    protected array $rules = [
        'name' => 'required',
        'bank_name' => 'required',
        'bsb' => 'required|size:7|regex:/^[\d]{3}-[\d]{3}$/i',
        'account_number' => 'required|size:9|regex:/^[\d]+$/i',
    ];

    public $bank_details;

    public function __construct(
        UsersRepository $userService,
        UserBankDetailsRepository $bankDetailsService,
    )
    {
        $this->userService = $userService;
        $this->bankDetailsService = $bankDetailsService;
        $this->bank_details = (object) [];
    }

    /**
     * @param $result
     * @return object
     * @throws ErrorException
     */
    public function __requestValid($result): object
    {
        if(!$this->checkPermissions()){
            throw new ErrorException('Permission error', 500);
        }

        $this->saveUserBankDetails();

        return $this->response($this->bank_details, Response::HTTP_OK);
    }

    protected function checkPermissions(): bool
    {
        return $this->userService->checkPermissions($this->id);
    }

    protected function saveUserBankDetails(): static
    {
        $request = $this->request->all();

        $request['user_id'] = $this->id;
        $this->bank_details = $this->bankDetailsService->updateByUser($request, $this->id);

        return $this;
    }
}
