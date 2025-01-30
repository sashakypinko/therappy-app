<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Additional;
use App\Repositories\Media\MediaRepository;
use App\Requests\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class AdditionalController extends Controller
{
    /**
     * Initialize Attributes
     *
     */
    public function __construct()
    {

    }

    public function getList(Request $request): JsonResponse
    {
        $result = Additional::all();
        return new JsonResponse($result, Response::HTTP_OK);
    }
}
