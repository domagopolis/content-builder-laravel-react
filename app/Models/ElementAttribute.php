<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ElementAttribute extends Model
{
    use HasFactory;

    protected $fillable = ['element_id', 'name', 'value'];
}
