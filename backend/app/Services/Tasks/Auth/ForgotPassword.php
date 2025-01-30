<?php namespace App\Services\Tasks\Auth;

use App\Handlers\Services\Abstracts\AbstractService;
use App\Models\User;

/**
 * Generates a link where they can change their password.
 */
class ForgotPassword extends AbstractService
{
	protected $email;
	protected $uuid;
	protected $expiration;

	public function __construct(User $user)
	{
		$this->expiration = date('Y-m-d H:i:s', strtotime('+1 day'));
		//$this->uuid = utilities()->string()->uuid();
	}

	public function setEmail($email)
	{
		$this->email = $email;
		return $this;
	}
	public function getEmail()
	{
		return $this->email;
	}

	/**
	 * Runs the Service
	 */
	public function run()
	{
		$user = $this->models->user->where('email', $this->email)->first();

		if($user)
		{
			// Update reset password related fields.
            $user->reset_password_token = $this->uuid;
			$user->reset_password_expiration = $this->expiration;
			$user->save();

            mailHandler()->user->forgotPassword(
            	"$user->first_name $user->last_name", // Name of the User
            	$user->email, // Email of the User
            	url()->route('auth.forgot.password', [$this->uuid]) // Link to Change Password
            );

			return (object) ['code' => 200, 'data' => $user];
		}
		else
		{
			return (object) ['code' => 400, 'data' => 'No user found'];
		}
	}

    protected function __processService()
    {
        // TODO: Implement __processService() method.
    }
}
