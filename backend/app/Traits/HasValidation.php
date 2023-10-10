<?php

namespace App\Traits;

use Illuminate\Support\Facades\Validator;

trait HasValidation
{
    private function validation(array $input, array $rules)
    {
        $validator = Validator::make($input, $rules);

        if($validator->fails()) {
            return [
                'success' => false,
                'errors' => $validator->errors()
            ];
        }

        return [
            'success' => true,
            'fieldsValidated' => $validator->validated()
        ];
    }
}
