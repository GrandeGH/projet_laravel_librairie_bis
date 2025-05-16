<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Auteur extends Model
{
    /** @use HasFactory<\Database\Factories\AuteurFactory> */
    use HasFactory;

    protected $fillable = [
        'nom',
    ];

    public function auteurs(): HasMany
{
    return $this->hasMany(Livre::class, 'auteur_id');
}


}
