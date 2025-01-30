<?php

namespace App\Handlers\Services\Exceptions;

use Exception;

class ServiceException extends Exception
{
    // Redefine the exception so message isn't optional
    public function __construct($message, $code = 0, Exception $previous = null)
    {
        // some code
        // make sure everything is assigned properly
        parent::__construct($message, $code, $previous);
    }

    // custom string representation of object
    public function __toString()
    {
        return sprintf('%s: [%s]: %s%s', self::class, $this->code, $this->message, PHP_EOL);
    }
}