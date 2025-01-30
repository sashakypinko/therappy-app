<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    const TYPE_INITIAL = 1;
    const TYPE_FOLLOW_UP = 2;

    const TYPES = [
        self::TYPE_INITIAL => ['price' => 199, 'duration' => 60, 'name' => 'Initial Consultation', 'description' => 'Initial Consultation'],
        self::TYPE_FOLLOW_UP => ['price' => 129, 'duration' => 45, 'name' => 'Follow-Up', 'description' => 'Follow-Up'],
    ];

    protected $fillable = [
        'name',
        'category_id',
        'image_id',
        'description',
        'status',
        'price',
        'duration'
    ];

    protected $appends = ['types'];

    protected $table = 'services';

    public function getTypesAttribute()
    {
        return self::TYPES;
    }

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'category_id', 'id');
    }


}
