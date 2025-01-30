<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\User;
use App\Models\UserDetails;
use App\Models\UserSchedule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Physiotherapy 1',
                'category_id' => 1,
                'description' => 'Physiotherapy text',
            ],
            [
                'name' => 'Physiotherapy 2',
                'category_id' => 1,
                'description' => 'Physiotherapy 2 text',
            ],
            [
                'name' => 'Personal trainer 1',
                'category_id' => 2,
                'description' => 'Personal trainer text',
            ],
        ];
        foreach($services as $cat) {
           Service::create($cat);
        }

        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'type' => User::TYPE_ADMIN,
            'email' => 'admin@gmail.com',
            'password' => Hash::make('1111')
        ]);

        // 1|2IfbcZIerqYRn5QHUfDj7qlaqdkkGZ9egWmNCzwGc8818752
        DB::table('personal_access_tokens')->insert([
            'tokenable_type' => 'App\Models\User',
            'tokenable_id' => '1',
            'name' => 'API TOKEN',
            'token' => '5d8fa3d7093d2ac7644f9ed9d3ea3d4a2b67a8a47e88fe0c08be30aa6d847cca',
            'abilities' => '["*"]',
            'last_used_at' => '2023-10-27 15:57:15'
        ]);

        $therapists = [
            [
                'first_name' => 'Therapist1',
                'last_name' => 'First',
                'type' => User::TYPE_THERAPIST,
                'email' => 'therapist1@google.com',
                'password' => Hash::make('1111'),
                'status' => 1
            ],
            [
                'first_name' => 'Therapist2',
                'last_name' => 'Second',
                'type' => User::TYPE_THERAPIST,
                'email' => 'therapist2@google.com',
                'password' => Hash::make('1111'),
                'status' => 1
            ],
            [
                'first_name' => 'Therapist3',
                'last_name' => 'Third',
                'type' => User::TYPE_THERAPIST,
                'email' => 'therapist3@google.com',
                'password' => Hash::make('1111'),
                'status' => 0
            ],
        ];

        foreach($therapists as $therapist){
            $user = User::create($therapist);
            UserDetails::create([
                'user_id' => $user->id,
                'phone' => '+345555',
                'gender' => ''.mt_rand(0, 2).'',
                'preferred_gender' => ''.mt_rand(0, 2).'',
                'latitude' => '50.45466',
                'longitude' => '30.5238',
                'radius' => '5000',
                'address' => '108'.mt_rand(0, 100).' Santos St, Nellmapius, Pretoria, 0122',
                'description' => 'text '.$user->id
            ]);

            DB::table('user_services')->insert([
                'user_type' => 'App\Models\User',
                'user_id' => $user->id,
                'service_id' => '1',
            ]);

            DB::table('user_services')->insert([
                'user_type' => 'App\Models\User',
                'user_id' => $user->id,
                'service_id' => '2',
            ]);

            DB::table('user_services')->insert([
                'user_type' => 'App\Models\User',
                'user_id' => $user->id,
                'service_id' => '3',
            ]);
            for($i = 0; $i<7; $i++) {
                DB::table('user_schedules')->insert([
                    'user_id' => $user->id,
                    'day' => $i,
                    'start' => 480 + mt_rand(-2, 2) * 60,
                    'end' => 1080 + mt_rand(-2, 2) * 60,
                ]);
            }

        }
        //2|SCg8znhlZ9u3qimbFzdjOhiIfM88B6jIxDbjMJXt8a7a9116
        DB::table('personal_access_tokens')->insert([
            'tokenable_type' => 'App\Models\User',
            'tokenable_id' => '2',
            'name' => 'API TOKEN',
            'token' => '63f41eed75c9ad35da5678df80bf80afa29dd3bb7944de3e5b439cf3f5b8bf3f',
            'abilities' => '["*"]',
            'last_used_at' => '2023-10-27 15:57:15'
        ]);

        $clients = [
            [
                'first_name' => 'Client1',
                'last_name' => 'First',
                'type' => User::TYPE_CLIENT,
                'email' => 'client1@google.com',
                'password' => Hash::make('1111'),
                'status' => 0
            ],
            [
                'first_name' => 'client2',
                'last_name' => 'Second',
                'type' => User::TYPE_CLIENT,
                'email' => 'client2@google.com',
                'password' => Hash::make('1111'),
                'status' => 0
            ],
            [
                'first_name' => 'client3',
                'last_name' => 'Third',
                'type' => User::TYPE_CLIENT,
                'email' => 'client3@google.com',
                'password' => Hash::make('1111'),
                'status' => 0
            ],
        ];

        foreach($clients as $customer){
            $user = User::create($customer);
            UserDetails::create([
                'user_id' => $user->id,
                'phone' => '+345555',
                'gender' => ''.mt_rand(0, 2).'',
                'preferred_gender' => ''.mt_rand(0, 2).'',
                'latitude' => '50.45466',
                'longitude' => '30.5238',
                'radius' => '5000',
                'address' => '108'.mt_rand(0, 100).' Santos St, Nellmapius, Pretoria, 0122',
                'address_description' => '2 flour',
                'description' => 'text '.$user->id
            ]);
        }

        //3|bxNmFfiphZi1H3RWkbi99ItXOncxVOPq6oT0g0yY533a9527
        DB::table('personal_access_tokens')->insert([
            'tokenable_type' => 'App\Models\User',
            'tokenable_id' => '5',
            'name' => 'API TOKEN',
            'token' => '6834c5d6a5d6910336bc456657e9b458b2d08a09146f5b4ec24356d6026b5ed9',
            'abilities' => '["*"]',
            'last_used_at' => '2023-10-27 15:57:15'
        ]);

        $intervals = [
            ['start' => 600, 'end' => 1000],
        ];
        for($i = 1; $i<12; $i++) {
            $app = DB::table('appointments')->insert([
                'user_id' => 5,
                'service_id' => '1',
                'date' => '2023-12-17',
                'status' => 0,
                'latitude' => '50.45466',
                'longitude' => '30.5238',
                'address' => '1 fdgsdgsdg',
                'details' => '1 fdgsdgsdg',
                'description' => '1 fdgsdgsdg',
                'address_description' => '1 flour',
                'phone' => '+121341234',
                'price' => 199,
                'duration' => 60,
            ]);
            for ($j = 0; $j < 2; $j++) {
                DB::table('appointment_intervals')->insert([
                    'appointment_id' => $i,
                    'start' => 600 + mt_rand(-4, 4) * 60,
                    'end' => 1000 + mt_rand(-4, 4) * 60,
                ]);
            }
        }

        for($i = 1; $i<32; $i++) {
            $app = DB::table('appointments')->insert([
                'user_id' => 5,
                'service_id' => '1',
                'date' => '2023-12-17',
                'status' => 1,
                'latitude' => '50.45466',
                'longitude' => '30.5238',
                'address' => '1 fdgsdgsdg',
                'details' => '1 fdgsdgsdg',
                'description' => '1 fdgsdgsdg',
                'address_description' => '1 flour',
                'phone' => '+121341234',
                'price' => 199,
                'duration' => 60,
            ]);
            for ($j = 0; $j < 2; $j++) {
                DB::table('appointment_intervals')->insert([
                    'appointment_id' => $i,
                    'start' => 600 + mt_rand(-4, 4) * 60,
                    'end' => 1000 + mt_rand(-4, 4) * 60,
                ]);
            }
        }

        for($i = 1; $i<22; $i++) {
            $app = DB::table('appointments')->insert([
                'user_id' => 5,
                'therapist_id' => 2,
                'start' => 940 + $i * 60,
                'end' => 1000 + $i * 60,
                'service_id' => '1',
                'date' => '2023-12-17',
                'status' => 2,
                'latitude' => '50.45466',
                'longitude' => '30.5238',
                'address' => '1 fdgsdgsdg',
                'details' => '1 fdgsdgsdg',
                'description' => '1 fdgsdgsdg',
                'address_description' => '1 flour',
                'phone' => '+121341234',
                'price' => 199,
                'duration' => 60,
            ]);
            for ($j = 0; $j < 2; $j++) {
                DB::table('appointment_intervals')->insert([
                    'appointment_id' => $i,
                    'start' => 600 + mt_rand(-4, 4) * 60,
                    'end' => 1000 + mt_rand(-4, 4) * 60,
                ]);
            }
        }

        for($i = 1; $i<45; $i++) {
            $app = DB::table('appointments')->insert([
                'user_id' => 5,
                'therapist_id' => 2,
                'start' => 940 + $i * 60,
                'end' => 1000 + $i * 60,
                'service_id' => '1',
                'date' => '2023-12-01',
                'status' => 4,
                'latitude' => '50.45466',
                'longitude' => '30.5238',
                'address' => '1 fdgsdgsdg',
                'details' => '1 fdgsdgsdg',
                'description' => '1 fdgsdgsdg',
                'address_description' => '1 flour',
                'phone' => '+121341234',
                'price' => 199,
                'duration' => 60,
            ]);
            for ($j = 0; $j < 3; $j++) {
                DB::table('appointment_intervals')->insert([
                    'appointment_id' => $i,
                    'start' => 600 + mt_rand(-4, 4) * 60,
                    'end' => 1000 + mt_rand(-4, 4) * 60,
                ]);
            }
        }

        for($i = 1; $i<4; $i++) {
            $app = DB::table('appointments')->insert([
                'user_id' => 5,
                'therapist_id' => 2,
                'start' => 940 + $i * 60,
                'end' => 1000 + $i * 60,
                'service_id' => '1',
                'date' => '2023-12-01',
                'status' => 5,
                'latitude' => '50.45466',
                'longitude' => '30.5238',
                'address' => '1 fdgsdgsdg',
                'details' => '1 fdgsdgsdg',
                'description' => '1 fdgsdgsdg',
                'address_description' => '1 flour',
                'phone' => '+121341234',
                'price' => 199,
                'duration' => 60,
            ]);
            for ($j = 0; $j < 2; $j++) {
                DB::table('appointment_intervals')->insert([
                    'appointment_id' => $i,
                    'start' => 600 + mt_rand(-4, 4) * 60,
                    'end' => 1000 + mt_rand(-4, 4) * 60,
                ]);
            }
        }

    }
}
