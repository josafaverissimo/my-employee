<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Knowledge extends Model
{
    use HasFactory;

    protected $fillable = [
        'description'
    ];

    public static function getByEmployeeEntryId(int $employeeEntryId): array
    {
        return DB::table('employee_knowledge')
            ->join('employee_entries', 'employee_knowledge.employee_id', '=', 'employee_entries.id')
            ->join('knowledge', 'employee_knowledge.knowledge_id', '=', 'knowledge.id')
            ->where('employee_knowledge.employee_id', $employeeEntryId)
            ->select('knowledge.description')
            ->get()
            ->toArray();
    }
}
