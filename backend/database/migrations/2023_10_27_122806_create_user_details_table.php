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
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->text('address_description')->nullable();
            $table->bigInteger('image_id')->unsigned()->nullable();
            $table->foreign('image_id')->references('id')->on('medias');
            $table->text('description')->nullable();
            $table->integer('gender')->default(0);
            $table->integer('preferred_gender')->default(0);
            $table->double('longitude', 12, 8)->nullable();
            $table->double('latitude', 12, 8)->nullable();
            $table->integer('radius')->unsigned()->default(0);
            $table->integer('visa')->default(0)->nullable();
            $table->bigInteger('abn', false, true)->nullable();
            $table->string('ahrpa_number')->nullable();
            $table->string('remedial_number')->nullable();
            $table->text('contacts')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_details');
    }
};
