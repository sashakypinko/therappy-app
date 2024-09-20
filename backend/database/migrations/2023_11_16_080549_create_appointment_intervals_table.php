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
        Schema::create('appointment_intervals', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('appointment_id')->unsigned();
            $table->foreign('appointment_id')->references('id')->on('appointments')->onDelete('cascade');
            $table->integer('start')->default(0);
            $table->integer('end')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_intervals');
    }
};
