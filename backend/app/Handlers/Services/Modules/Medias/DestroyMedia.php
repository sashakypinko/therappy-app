<?php

namespace App\Handlers\Services\Modules\Medias;

use App\Handlers\Services\Abstracts\AbstractService;
use App\Handlers\Services\Traits\IdResourceTrait;
use App\Models\ComplianceHistory\ComplianceHistory;
use App\Models\ComplianceRequest\ComplianceRequest;
use App\Repositories\Media\MediaRepository;
use App\Libraries\Google\GoogleDrive;

class DestroyMedia extends AbstractService
{

    use IdResourceTrait;

    /**
     * Required Attributes to be Set.
     *
     * @var array
     */
    protected $requiredAttributes = ['id'];

    /**
     * Media Respository
     *
     * @var MediaRepository
     */
    protected $model;

    /**
     * Initialize Attributes
     *
     * @param MediaRepository $model
     */
    public function __construct(MediaRepository $model)
    {
        $this->model = $model;
    }

    /**
     * Process the Service
     */
    public function __processService()
    {
        $this->model = $this->model->byId($this->id);

        $this->deleteFile()->deleteRecord();

        return (object)['data' => $this->model, 'code' => 200];
    }

    /**
     * Deletes the File
     *
     * @return $this
     */
    protected function deleteFile()
    {
        GoogleDrive::delete([
            $this->model->url,
            $this->model->path
        ]);

        return $this;
    }

    /**
     * Deletes the Record from the DB
     */
    protected function deleteRecord()
    {
        $this->model->delete();

        /*$complianceRequest = ComplianceRequest::where('media_id', $this->model->id)->first();

        if ($complianceRequest) {
            ComplianceHistory::put(ComplianceHistory::TYPE_DOCUMENT_DELETED, $complianceRequest->id, [
                'document_name' => $this->model->name
            ]);
        }*/
    }

}
