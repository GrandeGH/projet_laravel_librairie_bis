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
        Schema::create('livres', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->foreignId('auteur_id')->constrained('auteurs')->onDelete('cascade');
            // 'author_id' est une clé étrangère qui référence la colonne 'id' de la table 'auteur'.
            // 'constrained' simplifie la définition.
            // 'onDelete('cascade')' signifie que si un auteur est supprimé, tous ses livres seront aussi supprimés.

            $table->foreignId('categorie_id')->constrained('categories')->onDelete('cascade');
            // Clé étrangère pour la catégorie.

            $table->year('publication_annee'); // Type YEAR pour l'année de publication
            $table->text('description')->nullable(); // Description, peut être vide (nullable)
            $table->string('isbn')->unique()->nullable(); // ISBN, unique et peut être vide
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livres');
    }
};
