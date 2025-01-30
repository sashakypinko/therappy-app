<?php

namespace App\Models;

use App\Traits\ScheduleStartEndTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserScheduleOverrides extends Model
{
    use HasFactory, ScheduleStartEndTrait;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'date',
        'start',
        'end'
    ];

    protected $table = 'user_schedules_overrides';

}
