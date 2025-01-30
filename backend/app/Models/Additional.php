<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Additional extends Model
{
    use HasFactory;

    public const OTHER_ADDITIONAL_ID = 8;

    protected $fillable = [
        'therapist_title',
        'customer_title',
        'is_file',
    ];

    protected $table = 'additionals';

}
