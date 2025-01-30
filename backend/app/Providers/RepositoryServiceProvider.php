<?php

namespace App\Providers;

use App\Repositories\Appointments\AppointmentsRepository;
use App\Repositories\Faq\FaqRepository;
use App\Repositories\LandingContent\LandingContentRepository;
use App\Repositories\Media\MediaRepository;
use App\Repositories\Orders\OrdersRepository;
use App\Repositories\Services\ServicesRepository;
use App\Repositories\Testimonials\TestimonialsRepository;
use App\Repositories\UserAdditionals\UserAdditionalsRepository;
use App\Repositories\UserBankDetails\UserBankDetailsRepository;
use App\Repositories\UserBlocked\UserBlockedRepository;
use App\Repositories\UserDetails\UserDetailsRepository;
use App\Repositories\Users\UsersRepository;
use App\Repositories\UserSchedules\UserSchedulesRepository;
use App\Repositories\UserSchedulesOverrides\UserSchedulesOverridesRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(ServicesRepository::class, \App\Repositories\Services\Eloquent::class);
        $this->app->bind(MediaRepository::class, \App\Repositories\Media\Eloquent::class);
        $this->app->bind(UsersRepository::class, \App\Repositories\Users\Eloquent::class);
        $this->app->bind(UserDetailsRepository::class, \App\Repositories\UserDetails\Eloquent::class);
        $this->app->bind(UserSchedulesRepository::class, \App\Repositories\UserSchedules\Eloquent::class);
        $this->app->bind(UserSchedulesOverridesRepository::class, \App\Repositories\UserSchedulesOverrides\Eloquent::class);
        $this->app->bind(UserAdditionalsRepository::class, \App\Repositories\UserAdditionals\Eloquent::class);
        $this->app->bind(UserBlockedRepository::class, \App\Repositories\UserBlocked\Eloquent::class);
        $this->app->bind(AppointmentsRepository::class, \App\Repositories\Appointments\Eloquent::class);
        $this->app->bind(TestimonialsRepository::class, \App\Repositories\Testimonials\Eloquent::class);
        $this->app->bind(FaqRepository::class, \App\Repositories\Faq\Eloquent::class);
        $this->app->bind(OrdersRepository::class, \App\Repositories\Orders\Eloquent::class);
        $this->app->bind(UserBankDetailsRepository::class, \App\Repositories\UserBankDetails\Eloquent::class);
        $this->app->bind(LandingContentRepository::class, \App\Repositories\LandingContent\Eloquent::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
