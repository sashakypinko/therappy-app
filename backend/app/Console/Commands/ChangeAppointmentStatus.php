<?php

namespace App\Console\Commands;

use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ChangeAppointmentStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:change-appointment-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Change status of appointments to active and finished';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $dateTimeNow = Carbon::now();

        DB::table('appointments')
            ->where('status', Appointment::STATUS_APPROVED)
            ->whereDate('date', $dateTimeNow)
            ->where('start', '<', $dateTimeNow->hour * 60 + $dateTimeNow->minute)
            ->update([
                'status' => Appointment::STATUS_ACTIVE
            ]);

        DB::table('appointments')
            ->where('status', Appointment::STATUS_ACTIVE)
            ->whereDate('date', $dateTimeNow)
            ->where('end', '<', $dateTimeNow->hour * 60 + $dateTimeNow->minute)
            ->update(['status' => Appointment::STATUS_FINISHED]);
    }
}
