<?php

namespace App\Providers;

use App\Observers\ElementObserver;
use App\Models\Element;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Element::observe(ElementObserver::class);
    }
}
