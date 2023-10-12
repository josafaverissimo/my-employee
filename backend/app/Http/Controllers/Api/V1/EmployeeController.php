<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\EmployeeEntry;
use App\Models\EmployeeKnowledge;
use App\Models\Knowledge;
use App\Traits\HasValidation;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    use HasValidation;


    public function index()
    {
        return array_reduce(
            EmployeeEntry::orderBy("name")->get()->toArray(),
            function($employeeEntries, $employeeEntry) {
                $knowledgeDescriptions = array_map(fn(\StdClass $knowledge) =>
                    $knowledge->description,
                Knowledge::getByEmployeeEntryId($employeeEntry['id']));

                $employeeEntries[] = [...$employeeEntry, "knowledge" => $knowledgeDescriptions];
                return $employeeEntries;
            }, []
        );
    }

    public function store(Request $request)
    {
        $fields = $request->all();
        $rules = [
            'name' => 'required|max:100',
            'email' => 'required|email|max:100',
            'cpf' => 'required|unique:employee_entries|max:14|min:14',
            'knowledge' => 'required|min:1|max:3'
        ];

        if(!empty($fields['phone'])) $rules['phone'] = "max:15|min:15";

        $validation = $this->validation($request->all(), $rules);

        if(!$validation['success']) return $validation['errors'];

        $fieldsValidated = $validation["fieldsValidated"];

        try {
            $fieldsValidated['name'] = mb_convert_case($fieldsValidated['name'], MB_CASE_LOWER);

            $lastInsertedEmployeeEntryId = EmployeeEntry::create($fieldsValidated)->id;
            $knowledgeIds = array_map(function($knowledgeDescription) {
                if($knowledgeDescription === 'database') $knowledgeDescription = 'banco de dados';

                return Knowledge::select('id')->where('description', $knowledgeDescription)->first()->id;
            }, $fieldsValidated['knowledge']);

            foreach($knowledgeIds as $knowledgeId) {
                EmployeeKnowledge::create([
                    'employee_id' => $lastInsertedEmployeeEntryId,
                    'knowledge_id' => $knowledgeId
                ]);
            }

            return response()->json([
                'message' => 'Entry created',
                'status' => true
            ]);
        } catch(\Illuminate\Database\QueryException $exception) {
            return response()->json([
                'message' => 'Entry not created',
                'status' => false,
                'error' => $exception->getMessage()
            ]);
        }
    }

    public function getByEmployeeName(string $employeeName)
    {
        return EmployeeEntry::where('name', $employeeName)->first();
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
