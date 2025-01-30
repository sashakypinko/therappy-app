<?php

namespace App\Forms\User;

use App\Forms\BaseGetForm;
use App\Repositories\User\UserRepository;
use Exception;

class UsersGetForm extends BaseGetForm
{
    protected function setData()
    {
        $user = app(UserRepository::class)->byId($this->user->id, ['user_types', 'organisations', 'organisations.documents']);

        $user->setHidden([
            'password',
            'profile_picture',
            'user_export_settings',
            'single_sign_on',
            'team'
        ]);
        $user->smsSignature = $user->sms_signature;
        $user->number = $user->agentProfile->contact->primary_number->number ?? $user->agentProfile->mobile ?? '';
        $user->profile_picture_data = $this->parseProfilePicture($user->profile_picture);

        $this->data = $user;
    }

    private function parseProfilePicture($profilePicture)
    {
        try {
            return json_decode($profilePicture, true);
        } catch (Exception $e) {
            return '';
        }
    }
}
