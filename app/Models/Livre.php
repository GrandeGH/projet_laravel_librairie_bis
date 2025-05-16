<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; //ajouté

class Livre extends Model
{
    /** @use HasFactory<\Database\Factories\LivreFactory> */
    use HasFactory;

    protected $fillable = [
        'titre',
        'auteur_id',
        'categorie_id',
        'publication_annee',
        'description',
        'isbn',
    ];

      /**
     * Récupère l'auteur auquel le livre appartient.
     * C'est une relation "Un Livre appartient à Un Auteur" (BelongsTo).
     */
    public function auteur(): BelongsTo
    {
        return $this->belongsTo(Auteur::class);
    }

    /**
     * Récupère la catégorie à laquelle le livre appartient.
     */
    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }

}
