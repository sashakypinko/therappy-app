<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('landing_contents', function (Blueprint $table) {
            $table->id();
            $table->longText('welcome_section_title')->nullable();
            $table->longText('welcome_section_subtitle')->nullable();
            $table->longText('welcome_section_button')->nullable();

            $table->longText('services_section_title')->nullable();
            $table->longText('services_section_card_title')->nullable();
            $table->longText('services_section_card_text')->nullable();

            $table->longText('why_therappy_section_title')->nullable();
            $table->longText('why_therappy_section_text')->nullable();

            $table->longText('advantages_section_title')->nullable();
            $table->longText('advantages_section_1_card_title')->nullable();
            $table->longText('advantages_section_1_card_text')->nullable();
            $table->longText('advantages_section_2_card_title')->nullable();
            $table->longText('advantages_section_2_card_text')->nullable();
            $table->longText('advantages_section_3_card_title')->nullable();
            $table->longText('advantages_section_3_card_text')->nullable();
            $table->longText('advantages_section_4_card_title')->nullable();
            $table->longText('advantages_section_4_card_text')->nullable();
            $table->longText('advantages_section_5_card_title')->nullable();
            $table->longText('advantages_section_5_card_text')->nullable();
            $table->longText('advantages_section_6_card_title')->nullable();
            $table->longText('advantages_section_6_card_text')->nullable();

            $table->longText('how_it_works_section_title')->nullable();
            $table->longText('how_it_works_section_1_step_text')->nullable();
            $table->longText('how_it_works_section_2_step_text')->nullable();
            $table->longText('how_it_works_section_3_step_text')->nullable();

            $table->longText('professionals_section_title')->nullable();
            $table->longText('professionals_section_text')->nullable();

            $table->longText('reviews_section_title')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('landing_contents');
    }
};
