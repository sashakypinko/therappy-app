<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAdditional extends Model
{
    use HasFactory;

    protected $fillable = [
        'additional_id',
        'media_id',
        'user_id',
        'checked'
    ];

    protected $table = 'user_additionals';

    public function question(): \Illuminate\Database\Eloquent\Relations\belongsTo
    {
        return $this->belongsTo(Additional::class, 'additional_id', 'id');
    }

    public function media(): \Illuminate\Database\Eloquent\Relations\belongsTo
    {
        return $this->belongsTo(Media::class, 'media_id', 'id');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\belongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}
