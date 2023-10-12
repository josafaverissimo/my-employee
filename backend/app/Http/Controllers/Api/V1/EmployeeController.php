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

    private function getEmployeeKnowledgeById(int $employeeEntryId): array
    {
        /**
         * O código abaixo pega todos os "knowledge" que estão vinculados
         * a um registro de "employee_entries" e retorna o valor da coluna description
         * de cada um dos índices
         */
        return array_map(
            fn(\StdClass $knowledge) => $knowledge->description,
            Knowledge::getByEmployeeEntryId($employeeEntryId)
        );
    }

    public function index()
    {
        /**
         * O código abaixo adiciona o índice "knowledge" ao array associativo
         * da linha 36. Esse índice contém todos os "knowledge" do "employee"
         */
        return array_reduce(
            EmployeeEntry::orderBy("name")->get()->toArray(), // todos os registros da tabela employee_entries
            function($employeeEntries, $employeeEntry) {
                $knowledgeDescriptions = $this->getEmployeeKnowledgeById($employeeEntry['id']);

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

        /**
         * Verifica se o campo phone foi preenchido, se sim
         * exige que ele seja preenchido corretamente, se não
         * ignora o campo, pois ele não é obrigatório.
         */
        if(!empty($fields['phone'])) $rules['phone'] = "max:15|min:15";

        $validation = $this->validation($request->all(), $rules);

        if(!$validation['success']) return $validation['errors'];

        $fieldsValidated = $validation["fieldsValidated"];

        try {
            // o nome do colaborador é armazenado em minúsculo
            $fieldsValidated['name'] = mb_convert_case($fieldsValidated['name'], MB_CASE_LOWER);

            /**
             * o último id inserido é necessário, pois será feito um relacionamento
             * de cardinalidade N:N entre as tabelas employee_entries e knowledge
             */
            $lastInsertedEmployeeEntryId = EmployeeEntry::create($fieldsValidated)->id;


            //O código abaixo pega os ids dos "knowledge" marcados pelo o usuário.
            $knowledgeIds = array_map(function($knowledgeDescription) {
                if($knowledgeDescription === 'database') $knowledgeDescription = 'banco de dados';

                return Knowledge::select('id')->where('description', $knowledgeDescription)->first()->id;
            }, $fieldsValidated['knowledge']); // $fieldsValidated['knowledge'] são as marcações do usuário

            /**
             * O código abaixo insere na tabela employee_knowledge
             * o id do usuário e o id de knowledge
             */
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
        $employeeEntry = EmployeeEntry::where('name', $employeeName)->first()->toArray();
        $employeeEntry['knowledge'] = $this->getEmployeeKnowledgeById($employeeEntry['id']);

        return $employeeEntry;
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
