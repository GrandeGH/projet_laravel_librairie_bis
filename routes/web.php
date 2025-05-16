<?php

use App\Http\Controllers\AuteurController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\ProfileController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Route::middleware(['auth', 'verified']) : Ce groupe assure que seules les personnes connectées et vérifiées peuvent accéder à ces routes.
Route::middleware(['auth', 'verified'])->group(function () {
    // Routes pour les Auteurs
    Route::get('/auteurs', [AuteurController::class, 'index'])->name('auteurs.index');
    Route::get('/auteurs/create', [AuteurController::class, 'create'])->name('auteurs.create');
    Route::post('/auteurs', [AuteurController::class, 'store'])->name('auteurs.store');
    Route::get('/auteurs/{auteur}/edit', [AuteurController::class, 'edit'])->name('auteurs.edit');
    Route::put('/auteurs/{auteur}', [AuteurController::class, 'update'])->name('auteurs.update');
    Route::delete('/auteurs/{auteur}', [AuteurController::class, 'destroy'])->name('auteurs.destroy');

    // Les routes pour Catégories et Livres viendront ici plus tard


});

Route::middleware(['auth', 'verified'])->group(function () {
    // Routes pour les Catégories
    Route::get('/categories', [CategorieController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [CategorieController::class, 'create'])->name('categories.create');
    Route::post('/categories', [CategorieController::class, 'store'])->name('categories.store');
    Route::get('/categories/{categorie}/edit', [CategorieController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{categorie}', [CategorieController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{categorie}', [CategorieController::class, 'destroy'])->name('categories.destroy');

});

Route::middleware(['auth', 'verified'])->group(function () {
    // Livres
    Route::get('/livres', [LivreController::class, 'index'])->name('livres.index');
    Route::get('/livres/create', [LivreController::class, 'create'])->name('livres.create');
    Route::post('/livres', [LivreController::class, 'store'])->name('livres.store');
    Route::get('/livres/{livre}/edit', [LivreController::class, 'edit'])->name('livres.edit');
    Route::put('/livres/{livre}', [LivreController::class, 'update'])->name('livres.update');
    Route::delete('/livres/{livre}', [LivreController::class, 'destroy'])->name('livres.destroy');

});





require __DIR__.'/auth.php';
