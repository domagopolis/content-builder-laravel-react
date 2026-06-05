<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/{path?}', 'app');
Route::view('/activities/{path?}', 'app');
Route::view('/activity/{path?}', 'app');
Route::view('/element/{path?}', 'app');
Route::view('/course_group/{path?}', 'app');
Route::view('/course/{path?}', 'app');
Route::view('/unit/{path?}', 'app');
Route::view('/vet_package/{path?}', 'app');
