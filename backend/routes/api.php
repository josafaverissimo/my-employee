<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\EmployeeController;

Route::prefix("v1")->group(function() {
    Route::apiResource("employees", EmployeeController::class);
});
