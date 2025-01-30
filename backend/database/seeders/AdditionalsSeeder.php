<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdditionalsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $additionals = [
            ['id' => 1, 'therapist_title' => 'Professional Qualifications' , 'customer_title' => 'Professional Qualifications', 'is_file' => 1, 'is_required' => 1],
            ['id' => 2, 'therapist_title' => 'Professional References' , 'customer_title' => 'Professional References', 'is_file' => 1, 'is_required' => 1],
            ['id' => 3, 'therapist_title' => 'Working with children clearance' , 'customer_title' => 'Working with children clearance', 'is_file' => 1, 'is_required' => 1],
            ['id' => 4, 'therapist_title' => 'National Police Clearance' , 'customer_title' => 'National Police Clearance', 'is_file' => 1, 'is_required' => 1],
            ['id' => 5, 'therapist_title' => 'Professional indemnity and insurance' , 'customer_title' => 'Professional indemnity and insurance', 'is_file' => 1, 'is_required' => 1],
            ['id' => 6, 'therapist_title' => 'I work with children' , 'customer_title' => 'Work with children', 'is_file' => 0, 'is_required' => 0],
            ['id' => 7, 'therapist_title' => 'I have overseas residency' , 'customer_title' => 'Overseas residency', 'is_file' => 0, 'is_required' => 0],
        ];

        foreach($additionals as $add) {
            DB::table('additionals')->where('id', $add['id'])->update([
                'therapist_title' => $add['therapist_title'],
                'customer_title' => $add['customer_title'],
                'is_file' => $add['is_file'],
                'is_required' => $add['is_required']
            ]);
        }
        DB::table('additionals')->where('id', '>', 7)->delete();
    }
}
