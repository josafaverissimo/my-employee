<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\EmployeeEntry;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EmployeeEntry::orderBy("name")->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|max:100",
            "email" => "required|email|max:100",
            "cpf" => "required|unique:employee_entries|max:14",
            "phone" => "required|max:15",
        ]);

        if($validator->fails()) {
            return $validator->errors();
        }

        $fieldsValidated = $validator->validated();

        try {
            EmployeeEntry::create($fieldsValidated);

            return response()->json([
                'message' => 'Entry created',
                'status' => true
            ]);
        } catch(\Exception $exception) {
            return response()->json([
                'message' => 'Entry not created',
                'status' => false
            ]);
        }
    }
}
