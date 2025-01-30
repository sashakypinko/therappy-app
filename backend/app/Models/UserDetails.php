<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    use HasFactory;

    const GENDER_ALL = 0;
    const GENDER_MALE = 1;
    const GENDER_FEMALE = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'phone',
        'gender',
        'preferred_gender',
        'latitude',
        'longitude',
        'radius',
        'address',
        'address_description',
        'image_id',
        'description',
        'visa',
        'abn',
        'ahrpa_number',
        'remedial_number',
        'contacts',
    ];

    protected $table = 'user_details';

    public function getContactsAttribute($value)
    {
        return $value && $value != '' ? unserialize($value) : [];
    }

    public function setContactsAttribute($value)
    {
        $this->attributes['contacts'] = $value && $value != '' ? serialize($value) : '';
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function attachments(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(Media::class, 'user_id', 'id')->where('medias.type', '=', Media::TYPE_ATTACHMENT);
    }

}
