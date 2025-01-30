<?php

namespace App\Services\Media;

use App\Models\Media;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;


class MediaService
{

    const DEFAULT_FILE = 'image-placeholder-no-image.png';
    const RESIZE_TYPES = [
        'original' => [],
        'thumbnail' => [50, 50],
        'small' => [100, 100],
        'medium' => [200, 200],
        'big' => [500, 500],
    ];

    public function __construct()
    {
    }

    public function storage($file, $type = Media::TYPE_PUBLIC, $mediaId = 0)
    {
        $originalName = $file->getClientOriginalName();
        $guessExtension = $file->guessClientExtension();
        $extension = $guessExtension !== 'bin' ? $guessExtension : $file->extension();
        $fileName = $this->getName($mediaId, $type, $extension);
        $filePath = $this->getDirectory($fileName);
        Storage::putFileAs($filePath, $file, $fileName);

        return [
            'name' => $originalName,
            'type' => $type,
            'extension' => $extension,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ];
    }

    public function deleteFile(Media $media): void
    {
        $fileName = $this->getName($media->id, $media->type, $media->extension);
        $filePath = $this->getDirectory($fileName);

        Storage::delete($filePath.$fileName);
    }

    public function getFile(Media $media)
    {
        $fileName = $this->getName($media->id, $media->type, $media->extension);
        $filePath = $this->getDirectory($fileName);

        //return Storage::get($filePath.$fileName);
        return storage_path('app/'.$filePath.$fileName);
    }

    public function getDefaultFile()
    {
        return storage_path('app/'.self::DEFAULT_FILE);
        //return Storage::get(self::DEFAULT_FILE);
    }

    public function getName($id, $type = Media::TYPE_PUBLIC, $extension = 'jpg'): string
    {
        $type = Media::TYPE_PUBLIC;
        return md5($type.'_'.$id).'.'.$extension;
    }

    public function getDirectory($name): string
    {
        return Media::MEDIA_FOLDER.substr($name, 0, 2).'/';
    }

    public function isHasPermission($media, $authUser = false): bool
    {
        $user = $authUser instanceOf User ? $authUser : auth('api')->user();

        if($user && ($user->isAdmin() || $media->user_id === $user->id)) return true;

        return false;
    }

    public function resizeMedia($path, $attributes): \Intervention\Image\Image
    {
        $resizeType = $attributes['size'] ?? 'original';
        $resize = self::RESIZE_TYPES[$resizeType] ?? [];
        $img = Image::make($path);

        if($resize){
            $img->resize($resize[0], $resize[1], function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
        }

        return $img;
    }

    public function compareTokens($requestToken, $modelToken): bool
    {
        return $requestToken === $modelToken;
    }
}
