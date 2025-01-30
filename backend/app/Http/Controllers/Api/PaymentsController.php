<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Order;
use App\Repositories\Appointments\AppointmentsRepository;
use App\Repositories\Orders\OrdersRepository;
use App\Repositories\Users\UsersRepository;
use App\Requests\Request;
use App\Services\Payments\PaymentsService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Stripe\StripeClient;

class PaymentsController extends Controller
{
    const PAYMENT_STATUS_SUCCEED = "succeeded";
    /**
     * Service Model
     *
     * @var UsersRepository
     */
    public UsersRepository $model;

    /**
     * Orders Repository
     *
     * @var OrdersRepository
     */
    public OrdersRepository $ordersService;

    /**
     * Service Model
     *
     * @var AppointmentsRepository
     */
    public AppointmentsRepository $appointmentsService;

    /**
     * Service Model
     *
     * @var PaymentsService
     */
    public PaymentsService $paymentService;

    /**
     * Initialize Attributes
     *
     * @param UsersRepository $model
     * @param PaymentsService $paymentService
     * @param AppointmentsRepository $appointmentsService
     * @param OrdersRepository $ordersService
     */
    public function __construct(UsersRepository $model, PaymentsService $paymentService, AppointmentsRepository $appointmentsService, OrdersRepository $ordersService)
    {
        $this->model = $model;
        $this->paymentService = $paymentService;
        $this->appointmentsService = $appointmentsService;
        $this->ordersService = $ordersService;
    }

    public function paymentCreate(Request $request): JsonResponse
    {
        try {
            $request = $request->all();
            $ids = $request['items'] ?? [];
            $appointments = $this->appointmentsService->getByIds($ids);
            if(!$appointments) throw new Exception('Nothing to pay!', Response::HTTP_INTERNAL_SERVER_ERROR);

            $sum = $this->paymentService->collectPaymentSum($appointments);
            $payment = $this->paymentService->createPayment($sum);
            $order = $this->ordersService->createOrder($request['items'], $payment);

            return response()->json([
                'status' => true,
                'client_secret' => $payment->client_secret,
                'order_id' => $order->id
            ], 200);
        } catch (Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function paymentComplete(Request $request): JsonResponse
    {
        try {
            $request = $request->all();
            $orderId = $request['order_id'] ?? 0;
            $order = $this->ordersService->byId($orderId);
            if(!$order) throw new Exception('Wrong order id!', Response::HTTP_INTERNAL_SERVER_ERROR);

            $ids = $order->items ?? [];

            $payment = $this->paymentService->getPayment($order->payment_intent_id);

            if( $payment->status !== self::PAYMENT_STATUS_SUCCEED ){
                throw new Exception('Payment error!', Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $order->fill(['status' => Order::STATUS_PAYED]);
            $order->save();

            $this->appointmentsService->changeStatusToPendingByIds($ids);

            return response()->json([
                'status' => true,
                'message' => 'Success'
            ], 200);
        } catch (Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }

    }

    /**
     * success response method.
     */
    public function stripePost(Request $request): JsonResponse
    {
        try {
            $stripe = new StripeClient('sk_test_51OKH1tHUr6Z0Slspv92VCDJNhF7DkY20GNbvY2TsrGNkkxWgWESJbEG5L3uSWlgS9O5mGefkEzOfEMEMQ1uVISDQ00ad2LAxzA');
            $payment = $stripe->paymentIntents->retrieve('pi_3OL6QoHUr6Z0Slsp1HGEbW9c', []);
            return response()->json([
                'status' => true,
                'message' => $payment
            ], 200);

            $payment = $stripe->paymentIntents->create([
                'amount' => 19900,
                'currency' => 'usd',
                'payment_method_types' => ['card'],
            ]);
            return response()->json([
                'status' => true,
                'message' => $payment->client_secret
            ], 200);
            $this->paymentService->pay($request->stripeToken);

            return response()->json([
                'status' => true,
                'message' => 'Success'
            ], 200);
        } catch (Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }

    }



}
