<?php

namespace App\Services\Payments;

use App\Models\Appointment;
use App\Models\User;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use RuntimeException;
use Stripe\Exception\ApiErrorException;
use Stripe\PaymentIntent;
use Stripe\StripeClient;

class PaymentsService
{

    public function __construct()
    {
    }


    public function getUser(string $email): User
    {
        $user = User::where('email', $email)->first();

        if (empty($user)) {
            throw new RuntimeException('Invalid User');
        }

        if (!$user->isActive()) {
            throw new RuntimeException('User is inactive');
        }

        return $user;
    }

    /**
     * @throws Exception
     */
    public function collectPaymentSum($appointments)
    {
        $sum = 0;
        foreach($appointments as $appointment){
            if($appointment->status !== Appointment::STATUS_NEW) throw new Exception('Wrong Appointment Status', Response::HTTP_INTERNAL_SERVER_ERROR);
            $sum += $appointment->price;
        }

        return $sum;
    }

    /**
     * @throws ApiErrorException
     */
    public function createPayment($sum): PaymentIntent
    {
        $stripe = new StripeClient(env('STRIPE_SECRET_KEY'));

        $payment = $stripe->paymentIntents->create([
            'amount' => $sum * 100,
            'currency' => 'aud',
            'payment_method_types' => ['card'],
        ]);

        return $payment;
    }

    /**
     * @throws ApiErrorException
     */
    public function getPayment($id): PaymentIntent
    {
        $stripe = new StripeClient(env('STRIPE_SECRET_KEY'));
        if(strpos($id, '_secret_')){
            $id = substr($id, 0, strpos($id, '_secret_'));
        }
        $payment = $stripe->paymentIntents->retrieve($id, []);

        return $payment;
    }

    /**
     * @throws Exception
     */
    function generateRandomString($length = 10): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function getUserByEmail(string $email): User
    {
        return User::where('email', $email)->first();
    }

    public function pay($token)
    {
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        Stripe\Charge::create ([
            "amount" => 100 * 100,
            "currency" => "usd",
            "source" => $token,
            "description" => "Test payment"
        ]);

    }
}
