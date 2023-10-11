<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeKnowledge extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'employee_id',
        'knowledge_id'
    ];
}
