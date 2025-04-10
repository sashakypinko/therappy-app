<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'welcome_section_title',
        'welcome_section_subtitle',
        'welcome_section_button',
        'services_section_title',
        'services_section_card_title',
        'services_section_card_text',
        'why_therappy_section_title',
        'why_therappy_section_text',
        'advantages_section_title',
        'advantages_section_1_card_title',
        'advantages_section_1_card_text',
        'advantages_section_2_card_title',
        'advantages_section_2_card_text',
        'advantages_section_3_card_title',
        'advantages_section_3_card_text',
        'advantages_section_4_card_title',
        'advantages_section_4_card_text',
        'advantages_section_5_card_title',
        'advantages_section_5_card_text',
        'advantages_section_6_card_title',
        'advantages_section_6_card_text',
        'how_it_works_section_title',
        'how_it_works_section_1_step_text',
        'how_it_works_section_2_step_text',
        'how_it_works_section_3_step_text',
        'professionals_section_title',
        'professionals_section_text',
        'reviews_section_title'
    ];

    protected $table = 'landing_contents';

}
