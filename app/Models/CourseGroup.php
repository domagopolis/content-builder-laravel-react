<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseGroup extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'vet_package_id'];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
