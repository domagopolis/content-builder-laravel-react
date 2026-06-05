<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVetPackageCourseGroupToCourse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->unsignedBigInteger('course_group_id')->nullable()->after('id');
            $table->foreign('course_group_id')->references('id')->on('course_groups')->onDelete('cascade');
        });
        Schema::table('courses', function (Blueprint $table) {
            $table->unsignedBigInteger('vet_package_id')->nullable()->after('id');
            $table->foreign('vet_package_id')->references('id')->on('vet_packages')->onDelete('cascade');
        });
        Schema::table('course_groups', function (Blueprint $table) {
            $table->unsignedBigInteger('vet_package_id')->nullable()->after('id');
            $table->foreign('vet_package_id')->references('id')->on('vet_packages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropForeign('courses_course_group_id_foreign');
            $table->dropColumn('course_group_id');
        });
        Schema::table('courses', function (Blueprint $table) {
            $table->dropForeign('courses_vet_package_id_foreign');
            $table->dropColumn('vet_package_id');
        });
        Schema::table('course_groups', function (Blueprint $table) {
            $table->dropForeign('course_groups_vet_package_id_foreign');
            $table->dropColumn('vet_package_id');
        });
    }
}
