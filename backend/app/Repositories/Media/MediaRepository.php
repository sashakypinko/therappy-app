<?php

namespace App\Repositories\Media;

use App\Models\Media;
use App\Requests\Request;

interface MediaRepository
{
    /**
     * Upload media and store to db.
     *
     * @param $file
     * @param string $type
     * @param null $user_id
     */
    public function upload($file, string $type = Media::TYPE_PUBLIC, $user_id = null);

    public function destroy($id);

    public function deleteFile($id);

    public function getMedia($id);
}
