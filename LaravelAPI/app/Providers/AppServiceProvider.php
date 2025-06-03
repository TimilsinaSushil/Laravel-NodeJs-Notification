<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // allows no more than 10 requests per user per hour
       RateLimiter::for('notifications', function (Request $request) {
        return Limit::perHour(10)->by(optional($request->user())->id ?: $request->ip());
    });
    }
}
