<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    const TYPE_PUBLIC = 1;
    const TYPE_ATTACHMENT = 2;
    const TYPE_ADDITIONAL = 3;
    const MEDIA_FOLDER = 'media/';

    public const TOKEN_SALT = 'asfdsf@#$_fdsfg345';

    protected $fillable = [
        'extension',
        'mime_type',
        'size',
        'type',
        'name',
        'user_id'
    ];

    protected $table = 'medias';

    protected $appends = ['token', 'url'];
    protected $hidden = ['token'];

    public function getTokenAttribute(): string
    {
        return substr(md5($this->getAttribute('id').self::TOKEN_SALT), 0, 30);
    }

    public function getUrlAttribute(): string
    {
        return route('api.media.get', ['id' => $this->getAttribute('id')]).'?token='.(app('App\Services\Media\MediaService')->isHasPermission($this) ? $this->getAttribute('token') : '');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
