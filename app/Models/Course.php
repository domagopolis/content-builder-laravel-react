<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'duration', 'vet_package_id', 'course_group_id'];

    public function units()
    {
        return $this->belongsToMany(Unit::class, 'course_units');
    }

    public function course_units()
    {
        return $this->hasMany(CourseUnit::class);
    }
}
