<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Physiotherapy question','text' => 'text Physiotherapy'],
            ['name' => 'Personal trainer question','text' => 'text Personal trainer'],
            ['name' => 'Massage question', 'text' => 'text Massage'],
            ['name' => 'Nurse question', 'text' => 'text Nurse'],
            ['name' => 'Speech therapist question', 'text' => 'text Speech therapist'],
            ['name' => 'Nutritionist question', 'text' => 'text Nutritionist'],
            ['name' => 'Podiatrist question', 'text' => 'text Podiatrist'],
            ['name' => 'Acupuncture question', 'text' => 'text Acupuncture'],
            ['name' => 'Exercise physiologist question', 'text' => 'text Exercise physiologist'],
            ['name' => 'Occupational therapy question', 'text' => 'text Occupational'],
            ['name' => 'Counselling question', 'text' => 'text Counselling'],
            ['name' => 'Cosmetic Therapy question', 'text' => 'text Cosmetic Therapy'],
            ['name' => 'Stretch Therapy question', 'text' => 'text Stretch Therapy'],
        ];
        foreach($categories as $cat) {
            DB::table('faq')->insert([
                'name' => $cat['name'],
                'text' => $cat['text']. ' Psychotherapy, also called talk therapy or usually just "therapy," is a form of treatment aimed at relieving emotional distress and mental health problems. Provided by any of a variety of trained professionals—psychiatrists, psychologists, social workers, or licensed counselors—it involves examining and gaining insight into life choices and difficulties faced by individuals, couples, or families. Therapy sessions refer to structured meetings between a licensed provider and a client with a goal of improving some aspect of their life. Psychotherapy encompasses many types of treatment and is practiced by a range of clinicians using a variety of strategies. The critical aspect is that the client or patient works collaboratively with the therapist and can identify improvement and positive change over time.'
            ]);
        }
    }
}
