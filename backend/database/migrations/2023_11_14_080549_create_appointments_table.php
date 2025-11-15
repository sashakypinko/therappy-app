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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('therapist_id')->unsigned()->nullable();
            $table->foreign('therapist_id')->references('id')->on('users');
            $table->bigInteger('preferred_therapist_id')->unsigned()->nullable();
            $table->foreign('preferred_therapist_id')->references('id')->on('users');
            $table->bigInteger('service_id')->unsigned();
            $table->foreign('service_id')->references('id')->on('services');
            $table->integer('status')->default(0);
            $table->date('date');
            $table->integer('start')->default(0);
            $table->integer('end')->default(0);
            $table->string('details')->nullable();
            $table->text('description')->nullable();
            $table->double('longitude', 12, 8)->nullable();
            $table->double('latitude', 12, 8)->nullable();
            $table->string('address')->nullable();
            $table->text('address_description')->nullable();
            $table->string('phone')->nullable();
            $table->float('price')->unsigned()->default(199);
            $table->integer('duration')->unsigned()->default(60);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
