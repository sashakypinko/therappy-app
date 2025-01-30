<?php

namespace App\Forms;

use App\Handlers\Services\Abstracts\AbstractCommonRequestService;

class EditForm extends BaseForm
{

    /**
     * @param $validation
     * @return object
     */
    public function __requestValid($validation)
    {
        $record = $this->model->where('id', $this->id)
            ->first();

        if (!$record) {
            return (object)
            [
                'data' => [
                    'error' => 'Something went wrong.',
                    'message' => 'Not Found',
                    'code' => '404'
                ],
                'code' => 404
            ];
        }

        $record->fill($this->request->all());
        $record->save();

        return (object)['data' => $record, 'code' => 200];
    }
}
