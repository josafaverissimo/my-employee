<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\EmployeeEntry;
use App\Traits\HasValidation;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    use HasValidation;

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
        $validation = $this->validation($request->all(), [
            "name" => "required|max:100",
            "email" => "required|email|max:100",
            "cpf" => "required|unique:employee_entries|max:14|min:14",
            "phone" => "required|max:15|min:15",
        ]);

        if(!$validation['success']) return $validation['errors'];

        $fieldsValidated = $validation["fieldsValidated"];

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

    public function validateEntry(Request $request, int $id)
    {
        $validation = $this->validation($request->all(), [
            'is_valid' => 'required|in:0,1|max:1|min:1'
        ]);

        if(!$validation['success']) return $validation['errors'];

        $isValidFieldValue = $validation["fieldsValidated"]["is_valid"];
        $employeeEntry = EmployeeEntry::find($id);

        $updated = $employeeEntry->update([
            'is_valid' => $isValidFieldValue,
            'validated_at' => date('Y-m-d H:i:s')
        ]);

        return response()->json([
            'message' => $updated ? 'Employee validated' : 'Employee not validated',
            'success' => $updated
        ]);
    }
}
