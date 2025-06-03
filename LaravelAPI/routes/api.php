<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;


// API Route for Notifications

Route::post('/notifications', [NotificationController::class, 'store'])
    ->middleware('throttle:notifications');