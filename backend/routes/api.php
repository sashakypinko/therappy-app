<?php

use App\Http\Controllers\Api\AdditionalController;
use App\Http\Controllers\Api\Admin\ServiceController;
use App\Http\Controllers\Api\AppointmentsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomersController;
use App\Http\Controllers\Api\LandingContentController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\PaymentsController;
use App\Http\Controllers\Api\SupportController;
use App\Http\Controllers\Api\TherapistsController;
use App\Http\Controllers\Api\UserBlockedController;
use App\Http\Controllers\Api\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/auth-error', function (Request $request) {
    return response()->json([
        'status' => false,
        'message' => 'auth error'
    ], 500);
})->name('api.users.auth-error');

Route::get('/404-error', function (Request $request) {
    return response()->json([
        'status' => false,
        'message' => '404 error'
    ], 404);
})->name('api.404-error');

Route::group(['prefix' => 'users'], function () {
    Route::post('/auth/register', [AuthController::class, 'createUser'])->name('api.users.register');
    Route::post('/auth/login', [AuthController::class, 'loginUser'])->name('api.users.login');
    Route::get('/auth/sign-up-google', [AuthController::class, 'signUpWithGoogle'])->name('api.users.sign-up-google');
    Route::get('/auth/get-auth-user', [AuthController::class, 'getAuthUser'])->middleware(['auth:sanctum'])->name('api.users.get-auth-user');
    Route::post('/subscribe-on-launch', [UsersController::class, 'subscribeOnLaunch'])->name('api.users.subscribe-on-launch');
    Route::get('/send-verification-code', [UsersController::class, 'sendVerificationCode'])->name('api.users.send-verification-code');
    Route::get('/apply-verification-code/{id}/{code}', [UsersController::class, 'applyVerificationCode'])->name('api.users.apply-verification-code');
    Route::post('/auth/send-reset-password-code', [AuthController::class, 'sendResetPasswordCode'])->name('api.users.send-reset-password-code');
    Route::get('/auth/get-reset-password-token', [AuthController::class, 'getResetPasswordToken'])->name('api.users.get-reset-password-token');
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])->name('api.users.reset-password');

    Route::get('/discover-questions', [UsersController::class, 'getDiscoverQuestions'])->middleware(['auth:sanctum'])->name('api.users.discover-questions');
    Route::post('/answer-discover-questions', [UsersController::class, 'answerDiscoverQuestions'])->middleware(['auth:sanctum'])->name('api.users.answer-discover-questions');
    Route::get('/reviews', [UsersController::class, 'getReviews'])->middleware(['auth:sanctum'])->name('api.users.reviews');
    Route::get('/{id}/review-counters', [UsersController::class, 'getReviewCounters'])->middleware(['auth:sanctum'])->name('api.users.review-counters');
    Route::get('/{id}/set-new-status', [UsersController::class, 'setNewStatus'])->middleware(['auth:sanctum'])->name('api.users.set-new-status');
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum', 'admin']], function() {
    Route::group(['prefix' => '/services'], function () {
        Route::post('/create', [ServiceController::class, 'create'])->name('api.admin.services.create');
        Route::get('/{id}', [ServiceController::class, 'get'])->name('api.admin.services.get');
        Route::post('/{id}/update', [ServiceController::class, 'update'])->name('api.admin.services.update');
        Route::delete('/{id}', [ServiceController::class, 'destroy'])->name('api.admin.services.destroy');
    });

    Route::group(['prefix' => '/customers'], function () {
        Route::post('/', [CustomersController::class, 'index'])->name('api.admin.users.index');
        Route::get('/{id}', [CustomersController::class, 'get'])->name('api.admin.users.get');
        Route::post('/{id}/update', [CustomersController::class, 'update'])->name('api.admin.users.update');
        Route::delete('/{id}', [CustomersController::class, 'destroy'])->name('api.admin.users.destroy');
    });

    Route::group(['prefix' => '/appointments'], function () {
        Route::post('/list', [AppointmentsController::class, 'adminGetList'])->name('api.appointments.admin-list');
    });

    Route::group(['prefix' => '/users'], function () {
        Route::post('/{id}/set-approved-status', [UsersController::class, 'setApprovedStatus'])->name('api.admin.users.set-approved-status');
        Route::post('/{id}/set-active-status', [UsersController::class, 'setActiveStatus'])->name('api.admin.users.set-active-status');
        Route::post('/{id}/set-declined-status', [UsersController::class, 'setDeclinedStatus'])->name('api.admin.users.set-declined-status');
        Route::post('/{id}/set-deleted-status', [UsersController::class, 'setDeletedStatus'])->name('api.admin.users.set-deleted-status');
    });

});

Route::group(['prefix' => '/therapists'], function () {
    Route::post('/', [TherapistsController::class, 'index'])->name('api.therapists.index');
    Route::post('/service-not-found', [TherapistsController::class, 'serviceNotFound'])->middleware(['auth:sanctum'])->name('api.therapists.service-not-found');
    Route::get('/{id}', [TherapistsController::class, 'get'])->name('api.therapists.get');
    Route::post('/{id}/update', [TherapistsController::class, 'update'])->middleware(['auth:sanctum'])->name('api.therapists.update');
    Route::get('/{id}/bank-details', [TherapistsController::class, 'getBankDetails'])->middleware(['auth:sanctum'])->name('api.therapists.bank-details');
    Route::post('/{id}/edit-bank-details', [TherapistsController::class, 'editBankDetails'])->middleware(['auth:sanctum'])->name('api.therapists.edit-bank-details');
    Route::post('/{id}/clear-schedule-override', [TherapistsController::class, 'clearScheduleOverride'])->middleware(['auth:sanctum'])->name('api.therapists.clear-schedule-override');
    Route::delete('/{id}', [TherapistsController::class, 'destroy'])->middleware(['auth:sanctum'])->name('api.therapists.destroy');
    Route::group(['prefix' => '/blocked', 'middleware' => ['auth:sanctum']], function () {
        Route::post('/block-user', [UserBlockedController::class, 'blockUser'])->name('api.therapists.blocked.block-user');
        Route::post('/list', [UserBlockedController::class, 'getList'])->name('api.therapists.blocked.list');
        Route::post('/check-user', [UserBlockedController::class, 'checkUser'])->name('api.therapists.blocked.check-user');
    });
});

Route::group(['prefix' => '/customers'], function () {
    Route::group(['prefix' => 'testimonials'], function () {
        Route::post('/create', [CustomersController::class, 'testimonialsCreate'])->middleware(['auth:sanctum'])->name('api.customers.testimonials.create');
        Route::post('/list', [CustomersController::class, 'testimonialsGetList'])->name('api.customers.testimonials.list');
        Route::get('/remind-later', [CustomersController::class, 'testimonialsRemindLater'])->middleware(['auth:sanctum'])->name('api.customers.testimonials.remind-later');
    });
    Route::get('/{id}', [CustomersController::class, 'get'])->name('api.customers.get');
    Route::post('/{id}/update', [CustomersController::class, 'update'])->middleware(['auth:sanctum'])->name('api.customers.update');

});

Route::group(['prefix' => '/appointments', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/therapist-list', [AppointmentsController::class, 'getList'])->name('api.appointments.therapist-list');
    Route::get('/get-totals', [AppointmentsController::class, 'getTotals'])->name('api.therapists.appointments.get-totals');
    Route::post('/customer-list', [AppointmentsController::class, 'customerGetList'])->name('api.appointments.customer-list');
    Route::post('/create', [AppointmentsController::class, 'create'])->name('api.appointments.create');
    //Route::post('/pay-cart', [AppointmentsController::class, 'payCart'])->name('api.appointments.pay-cart');
    Route::post('/payment-create', [PaymentsController::class, 'paymentCreate'])->name('api.appointments.payment-create');
    Route::post('/payment-complete', [PaymentsController::class, 'paymentComplete'])->name('api.appointments.payment-complete');
    Route::post('/get-available-schedule', [AppointmentsController::class, 'getAvailableSchedule'])->name('api.appointments.get-available-schedule');
    Route::get('/{id}', [AppointmentsController::class, 'get'])->name('api.appointments.get');
    Route::post('/{id}/edit', [AppointmentsController::class, 'edit'])->name('api.appointments.edit');
   // Route::post('/{id}/pay', [AppointmentsController::class, 'pay'])->name('api.appointments.pay');
    Route::post('/{id}/customer-cancel', [AppointmentsController::class, 'customerCancel'])->name('api.appointments.customer-cancel');
   // Route::get('/{id}', [AppointmentsController::class, 'get'])->name('api.appointments.get');
    Route::post('/{id}/accept', [AppointmentsController::class, 'accept'])->name('api.appointments.accept');
    Route::post('/{id}/therapist-cancel', [AppointmentsController::class, 'cancel'])->name('api.appointments.therapist-cancel');
    Route::post('/{id}/start', [AppointmentsController::class, 'start'])->name('api.appointments.start');
    Route::post('/{id}/finish', [AppointmentsController::class, 'finish'])->name('api.appointments.finish');
    Route::post('/{id}/review', [AppointmentsController::class, 'review'])->name('api.appointments.review');
});
/*
Route::group(['prefix' => '/payments', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/pay-cart', [PaymentsController::class, 'stripePost'])->name('api.appointments.pay-cart');
});
*/


Route::group(['prefix' => 'media'], function () {
    Route::get('/{id}', [MediaController::class, 'get'])->name('api.media.get');
    Route::post('/{id}/update', [MediaController::class, 'update'])->middleware(['auth:sanctum'])->name('api.media.update');
    Route::delete('/{id}', [MediaController::class, 'destroy'])->middleware(['auth:sanctum'])->name('api.media.destroy');
});

Route::group(['prefix' => '/support'], function () {
    Route::post('/contact-us', [SupportController::class, 'contactUs'])->middleware(['auth:sanctum'])->name('api.support.contact-us');
    Route::group(['prefix' => 'faq'], function () {
        Route::post('/list', [SupportController::class, 'faqGetList'])->name('api.support.faq.list');
    });
});
Route::post('/services', [ServiceController::class, 'index'])->name('api.services.index');
Route::get('/additional/questions', [AdditionalController::class, 'getList'])->name('api.additional.questions');

Route::group(['prefix' => 'credit-card'], function () {
    Route::get('/{id}', [AuthController::class, 'getEmptyResponse'])->name('api.credit-card.get');
    Route::post('/create', [AuthController::class, 'getEmptyResponse'])->name('api.credit-card.create');
    Route::post('/{id}/update', [AuthController::class, 'getEmptyResponse'])->middleware(['auth:sanctum'])->name('api.credit-card.update');
    Route::delete('/{id}', [AuthController::class, 'getEmptyResponse'])->middleware(['auth:sanctum'])->name('api.credit-card.destroy');
});

Route::group(['prefix' => 'landing-contents'], function () {
    Route::get('/', [LandingContentController::class, 'get'])->name('api.landing-contents.get');
    Route::post('/', [LandingContentController::class, 'update'])->name('api.landing-contents.update');
});


