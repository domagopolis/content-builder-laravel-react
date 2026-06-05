<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\VetPackageController;
use App\Http\Controllers\CourseGroupController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\CourseUnitController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ElementController;
use App\Http\Controllers\ElementAttributeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('vet_packages', VetPackageController::class);
Route::resource('course_groups', CourseGroupController::class);
Route::resource('courses', CourseController::class);
Route::resource('units', UnitController::class);
Route::resource('course_units', CourseUnitController::class);
Route::resource('activities', ActivityController::class);
Route::resource('elements', ElementController::class);
Route::resource('element_attibutes', ElementAttributeController::class);
