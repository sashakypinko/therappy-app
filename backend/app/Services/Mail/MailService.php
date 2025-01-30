<?php

namespace App\Services\Mail;

use App\Mail\ContactUs;
use App\Mail\ForgotPassword;
use App\Mail\NewAppointmentCustomer;
use App\Mail\OnLaunchEmail;
use App\Mail\ServiceNotFound;
use App\Mail\VerifyEmail;
use Illuminate\Support\Facades\Mail;


class MailService
{
    protected $to;
    protected $from;

    public function __construct()
    {
        $this->from = env('MAIL_FROM_ADDRESS');
        $this->to = env('MAIL_ADMIN_ADDRESS');
    }

    public function setTo($to): static
    {
        $this->to = $to;

        return $this;
    }

    public function send($mail)
    {
       Mail::to($this->to)->send($mail);
    }

    public function onLaunchSubscribe($request)
    {
        $mail = new OnLaunchEmail( (object) ['name' => (int) $request['type'] === 1 ? 'Customer' : 'Therapist']);
        $this->setTo($request['email'])->send($mail);
    }

    public function contactUs($request)
    {
        $user = auth('api')->user();
        if(!$user){
            $user = (object) ['first_name' => $request['first_name'] ?? '-', 'last_name' => $request['last_name'] ?? '-', 'email' => $request['email'] ?? '-'];
        }
        $data = [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'name' => $user->first_name.' '.$user->last_name,
            'email' => $user->email,
            'subject' => $request['subject'] ?? '-',
            'text' => $request['text'] ?? '-',
        ];
        $mail = new ContactUs( (object) $data);
        $this->send($mail);
    }

    public function serviceNotFound($request)
    {
        $user = auth()->user();
        if(!$user){
            $user = (object) ['first_name' => $request['first_name'] ?? '-', 'last_name' => $request['last_name'] ?? '-', 'email' => $request['email'] ?? '-'];
        }
        $data = [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'name' => $user->first_name.' '.$user->last_name,
            'email' => $user->email,
            'title' => $request['title'] ?? '-',
        ];

        $mail = new ServiceNotFound( (object) $data);
        $this->send($mail);
    }

    public function forgotPassword($user, $code)
    {
        $data = [
            'code' => $code,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'name' => $user->first_name.' '.$user->last_name,
            'email' => $user->email,
        ];

        $mail = new ForgotPassword( (object) $data);
        $this->setTo($user->email)->send($mail);
    }

    public function verificationCode($user, $code)
    {
        $data = [
            'link' => env('APP_URL').'/apply-verification-code/'.$user->id.'/'.$code,
        ];

        $mail = new VerifyEmail( (object) $data);
        $this->setTo($user->email)->send($mail);
    }

    public function newAppointmentCustomer($appointment)
    {
        $appointment->load(['user', 'therapist', 'service']);
        $data = [
            'first_name' => $appointment->user->first_name,
            'last_name' => $appointment->user->last_name,
            'name' => $appointment->user->first_name.' '.$appointment->user->last_name,
            'address' => $appointment->address,
            'date' => $appointment->date,
            'time' => $appointment->start,
            'therapist' => $appointment->therapist->toArray(),
            'therapist_name' => $appointment->therapist->first_name.' '.$appointment->therapist->last_name,
            'service_name' => $appointment->service->name,
        ];
        $subject = 'Confirmation of Your In-Home Physiotherapy Session with '.env('APP_NAME', 'Therappy').'/[Service Name]';
        $subject = str_replace('[Service Name]', $appointment->service->name, $subject);

        $mail = new NewAppointmentCustomer( (object) $data, $subject);
        $this->setTo($appointment->user->email)->send($mail);
    }
}
