<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Element extends Model
{
    use HasFactory;

    protected $fillable = ['activity_id', 'name', 'order'];

    public function element_attributes()
    {
      return $this->hasMany(ElementAttribute::class);
    }
}
