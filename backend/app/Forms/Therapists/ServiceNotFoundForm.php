<?php

namespace App\Forms\Therapists;

use App\Forms\BaseForm;
use App\Repositories\UserDetails\UserDetailsRepository;
use App\Repositories\Users\UsersRepository;
use App\Services\Mail\MailService;
use Illuminate\Http\Response;

class ServiceNotFoundForm extends BaseForm
{
    /**
     * @var string[]
     */
    protected array $rules = [
        'title' => 'required',
    ];

    /**
     * Mail
     *
     * @var MailService
     */
    protected MailService $mailService;

    public function __construct(
        MailService $mailService
    )
    {
        $this->mailService = $mailService;
    }

    /**
     * @param $result
     * @return object
     */
    public function __requestValid($result): object
    {
        $this->sendToAdmin();

        return $this->response(['status' => true, 'message' => 'Success'], Response::HTTP_OK);
    }

    protected function sendToAdmin(): static
    {
        $this->mailService->serviceNotFound($this->request->all());
        return $this;
    }

}
