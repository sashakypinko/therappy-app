<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'comment',
        'rating_therapist',
        'rating_platform',
        'rating_general',
    ];

    protected $table = 'testimonials';

    protected $appends = [
        'rating',
    ];


    public function getRatingAttribute(): float
    {
        return round(( 3 + $this->getAttribute('rating_therapist') + $this->getAttribute('rating_platform') + $this->getAttribute('rating_general')) / 3, 1);
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}
