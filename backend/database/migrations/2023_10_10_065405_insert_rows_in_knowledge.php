<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('knowledge')->insert([
            ["description" => "git"],
            ["description" => "react"],
            ["description" => "php"],
            ["description" => "nodejs"],
            ["description" => "devops"],
            ["description" => "banco de dados"],
            ["description" => "typescript"]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
