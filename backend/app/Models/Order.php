<?php

namespace App\Models;

use App\Traits\ScheduleStartEndTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    const STATUS_NEW = 0;
    const STATUS_PAYED = 1;
    const STATUS_CANCELLED = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'items',
        'amount',
        'payment_intent_id',
        'status',
    ];

    protected $table = 'appointment_orders';

    public function getItemsAttribute($value)
    {
        return $value && $value != '' ? unserialize($value) : [];
    }

    public function setItemsAttribute($value)
    {
        $this->attributes['items'] = $value && $value != '' ? serialize($value) : '';
    }

    public function getAmountAttribute($value)
    {
        return $value*100;
    }

    public function setAmountAttribute($value)
    {
        $this->attributes['amount'] = $value/100;
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }



}
