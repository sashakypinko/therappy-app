<?php

namespace App\Forms\Admin\Customers;

use App\Forms\BaseForm;
use App\Repositories\UserDetails\UserDetailsRepository;
use App\Repositories\Users\UsersRepository;
use App\Services\Mail\MailService;
use Illuminate\Http\Response;

class ContactUsForm extends BaseForm
{
    /**
     * @var string[]
     */
    protected array $rules = [
        'subject' => 'required',
        'text' => 'required',
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

        return $this->response('Success', Response::HTTP_OK);
    }

    protected function sendToAdmin(): static
    {
        $this->mailService->contactUs($this->request->all());
        return $this;
    }

}
