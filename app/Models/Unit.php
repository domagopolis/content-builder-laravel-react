<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'code', 'description'];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_units');
    }
}
