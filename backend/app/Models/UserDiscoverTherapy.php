<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDiscoverTherapy extends Model
{
    use HasFactory;

    public const QUESTIONS = [
        0 => 'Search engine (Google, Yahoo, etc.)',
        1 => 'Recommended by friend or colleague',
        2 => 'Social media',
        3 => 'Blog or publication',
        4 => 'Other'
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'answer',
        'text',
    ];

    protected $table = 'users_discover_therapy';

}
