<?php

namespace App\Handlers\Services\Abstracts;

use App\Handlers\Services\Exceptions\ServiceException;
use Illuminate\Http\Request;
use Illuminate\Validation\Validator;

/**
 * Abstract Class for Services that Uses Request
 */
abstract class AbstractCommonRequestService extends AbstractService
{
    /**
     * Attributes for validation
     *
     * @var array
     */
    protected array $attributesArray = [];

    /**
     * Request to be validated.
     *
     * @var Request
     */
    protected Request $request;

    /**
     * If request successfully passed the validation.
     * Then call this function.
     *
     * @param  $result [Vesult of the validator.]
     */
    abstract protected function __requestValid($result);

    /**
     * Abstract Function from AbstractService
     * Validates the Request via Laravel Validation! returns abstracted function __requestValid, and they may override __requestInvalid as well.
     */
    public function __processService()
    {
        $this->request = $this->request ?? request();
        $result = $this->__validate();

        return $result->fails() ? $this->__requestInvalid($result)
            : $this->__requestValid($result);
    }

    /**
     * Default Invalid Request Handler
     *
     * @param Validator
     *
     * @return object
     */
    public function __requestInValid($validation)
    {
        return (object)['data' => $validation->errors()->messages(), 'code' => 422];
    }

    /**
     * Validates the set $validations.
     *
     * @return Validator
     * @throws ServiceException if validation is not setup properly
     */
    protected function __validate()
    {
        $validations = $this->__createValidations();

        // Must set a $validation before processing
        if (is_array($validations)) {
            $messages    = $validations[1] ?? [];
            $validations = $validations[0] ?? $validations;

            return \Validator::make($this->getAttributesArray(), $validations, $messages);
        }

        throw new ServiceException('Validations set must be a type of an array.');
    }

    /**
     * Returns Validation Array
     *
     * @return array [Array of validations]
     */
    protected function __createValidations()
    {
        return [];
    }

    /** Manually set attributes array instead of using $this->>request->all()
     * @param array $attributes
     * @return $this
     */
    public function setAttributesArray(array $attributes)
    {
        $this->attributesArray = $attributes;

        return $this;
    }

    /**
     * Returns attributes array given for validation
     */
    public function getAttributesArray()
    {
        return count($this->attributesArray) ? $this->attributesArray : $this->request->all();
    }

    /**
     * Returns custom message for invalid request
     * @param $attribute
     * @param $message
     * @return object
     */
    public function invalidRequest($attribute, $message)
    {
        return (object)[
            'data' => [$attribute => [$message]],
            'code' => 422
        ];
    }
}
