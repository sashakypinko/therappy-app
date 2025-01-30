<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InstallDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Physiotherapy'],
            ['name' => 'Personal trainer'],
            ['name' => 'Massage'],
            ['name' => 'Nurse'],
            ['name' => 'Speech therapist'],
            ['name' => 'Nutritionist'],
            ['name' => 'Podiatrist'],
            ['name' => 'Acupuncture'],
            ['name' => 'Exercise physiologist'],
            ['name' => 'Occupational therapy'],
            ['name' => 'Counselling'],
            ['name' => 'Cosmetic Therapy'],
            ['name' => 'Stretch Therapy'],
        ];
        foreach($categories as $cat) {
            DB::table('service_categories')->insert([
                'name' => $cat['name'],
                'image' => ''
            ]);
        }
/*
        $additionals = [
            ['therapist_title' => 'I work with children' , 'customer_title' => 'Permission to work with children', 'is_file' => 0],
            ['therapist_title' => 'I have a Covid vaccination' , 'customer_title' => 'Covid-19 vaccination certificate', 'is_file' => 1],
            ['therapist_title' => 'I am an Australian citizen' , 'customer_title' => 'To be an Australian citizen', 'is_file' => 1],
            ['therapist_title' => 'I have insurance declaration' , 'customer_title' => 'Insurance declaration', 'is_file' => 1],
            ['therapist_title' => 'I have overseas residency' , 'customer_title' => 'Overseas residency', 'is_file' => 0],
            ['therapist_title' => 'I have professional indemnity and insurance' , 'customer_title' => 'Professional indemnity and insurance', 'is_file' => 1],
        ];
*/

        $additionals = [
            ['therapist_title' => 'Diploma' , 'customer_title' => 'Diploma', 'is_file' => 1, 'is_required' => 1],
            ['therapist_title' => 'Professional certificate' , 'customer_title' => 'Professional certificate', 'is_file' => 1, 'is_required' => 1],
            ['therapist_title' => 'Australian ID' , 'customer_title' => 'Australian ID', 'is_file' => 1, 'is_required' => 1],
            ['therapist_title' => 'Covid vaccination certificate' , 'customer_title' => 'Covid vaccination certificate', 'is_file' => 1, 'is_required' => 1],
            ['therapist_title' => 'Insurance declaration' , 'customer_title' => 'Insurance declaration', 'is_file' => 1, 'is_required' => 1],
            ['therapist_title' => 'Professional indemnity and insurance' , 'customer_title' => 'Professional indemnity and insurance', 'is_file' => 1, 'is_required' => 1],
            ['therapist_title' => 'I work with children' , 'customer_title' => 'Permission to work with children', 'is_file' => 1, 'is_required' => 0],
            ['therapist_title' => 'I have overseas residency' , 'customer_title' => 'Overseas residency', 'is_file' => 0, 'is_required' => 0],
        ];

        foreach($additionals as $add) {
            DB::table('additionals')->insert([
                'therapist_title' => $add['therapist_title'],
                'customer_title' => $add['customer_title'],
                'is_file' => $add['is_file']
            ]);
        }
    }
}
