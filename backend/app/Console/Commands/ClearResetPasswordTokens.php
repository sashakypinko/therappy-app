<?php

namespace App\Console\Commands;

use App\Models\UserScheduleOverrides;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ClearResetPasswordTokens extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-reset-password-tokens';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DB::table('password_reset_tokens')->where('created_at', '<', Carbon::now()->subMinutes(15))->delete();
    }
}
