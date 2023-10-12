<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\EmployeeController;

Route::prefix("v1")->group(function() {
    Route::get("employees", [EmployeeController::class, "index"]);
    Route::get("employees/{employeeName}", [EmployeeController::class, "getByEmployeeName"]);
    Route::post("employees", [EmployeeController::class, "store"]);
    Route::post("employees/validate/{id}", [EmployeeController::class, "validateEntry"]);
});
