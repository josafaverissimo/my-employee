<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /**
         * A tabela criada a seguir deverá armazenar os registros dos empregados
         */
        Schema::create('employee_entries', function (Blueprint $table) {
            $table->id();

            /**
             * As colunas name e email devem ter o tamanho de 100 caracteres e não podem ter o valor null
             * A coluna cpf deve ter 14 caracteres e não pode ter o valor null
             * A coluna phone deve ter 15 caracteres e pode ter o valor null
             * A coluna validate_at serve para indicar se o registro foi validad ou não
             */
            $table->string("name", 100)->nullable(false);
            $table->string("email", 100)->nullable(false);
            $table->string("cpf", 14)->nullable(false)->unique();
            $table->string("phone", 15);
            $table->dateTime("validate_at")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_entries');
    }
};
