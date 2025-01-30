<?php

namespace App\Http\Controllers\Api;

use App\Forms\Admin\Customers\ContactUsForm;
use App\Forms\Admin\Customers\CustomerDeleteForm;
use App\Forms\Admin\Customers\CustomerEditForm;
use App\Forms\Admin\Customers\CustomerGetForm;
use App\Forms\Admin\Customers\TestimonialCreateForm;
use App\Handlers\Services\Classes\Datatable;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\Faq\FaqRepository;
use App\Repositories\Testimonials\TestimonialsRepository;
use App\Repositories\Users\UsersRepository;
use App\Requests\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class SupportController extends Controller
{
    /**
     * faq Service
     *
     * @var FaqRepository
     */
    public FaqRepository $faqService;

    /**
     * Initialize Attributes
     *
     * @param FaqRepository $faqService
     */
    public function __construct(FaqRepository $faqService)
    {
        $this->faqService = $faqService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function contactUs(Request $request): JsonResponse
    {
        try {
            $result = app(ContactUsForm::class)
                ->run();

            return new JsonResponse($result->data, $result->code);
        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function faqGetList(Request $request): JsonResponse
    {
        try {
            $result = (new Datatable($this->faqService, $request))->run();

            return new JsonResponse($result, Response::HTTP_OK);
        } catch (\Exception $e) {

            return new JsonResponse([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



}
