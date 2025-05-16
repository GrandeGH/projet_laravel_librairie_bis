<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; 

class Categorie extends Model
{
    /** @use HasFactory<\Database\Factories\CategorieFactory> */
    use HasFactory;

    protected $fillable = [
        'nom',
    ];

    /**
 * Récupère tous les livres de cette catégorie.
 */
    public function categories(): HasMany
    {
        return $this->hasMany(Livre::class, 'categorie_id');
    }
}
