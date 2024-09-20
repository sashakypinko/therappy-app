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
        Schema::create('user_additionals', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('additional_id')->unsigned();
            $table->foreign('additional_id')->references('id')->on('additionals');
            $table->bigInteger('media_id')->unsigned()->nullable();
            $table->foreign('media_id')->references('id')->on('medias');
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('checked')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_additionals');
    }
};
