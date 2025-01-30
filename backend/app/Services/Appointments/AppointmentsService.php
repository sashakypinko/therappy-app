<?php

namespace App\Services\Appointments;

use App\Models\User;
use Carbon\Carbon;

class AppointmentsService
{
    public function transformTimeToMinutesDiff($time): int
    {
        $dt = Carbon::today();
        return $time ? Carbon::createFromFormat('Y-m-d H:i:s', $dt->format('Y-m-d').' '.$time)->diffInMinutes($dt) : 0;
    }

    public function getTotalsForInterval($builder, $startDate, $endDate): array
    {
        $totals = ['0:00', '$0'];

        $query = clone $builder;
        $total = $query->where('date', '>=' , $startDate)->where('date', '<=' , $endDate)->first();
        if($total){
            $durationInMinutes = $total->total_duration%60 >= 10 ? $total->total_duration%60 : '0'.$total->total_duration%60;
            $totalHours = intdiv( (int) $total->total_duration,60) .':'.$durationInMinutes;
            $totalPrice = '$'.number_format($total->total_price);
            $totals = [$totalHours, $totalPrice];
        }

        return $totals;
    }

    public function checkRateUs($appointment): bool
    {
        $user = $appointment->user();
        if($user->is_rate_us){
            return $user->is_rate_us < Carbon::now();
        }
        User::where('user_id', $user->id)->update(['is_rate_us' => Carbon::now()]);

        return true;
    }

}
