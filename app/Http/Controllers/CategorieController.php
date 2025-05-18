<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use Illuminate\Http\Request;
use Inertia\Inertia; // Important pour Inertia

class CategorieController extends Controller
{

    public function index()
    {
        // récupère tous les categories, triés par nom
        $categories = Categorie::orderBy('nom')->get();
        // Rend le composant React 'Authors/Index.jsx' et lui passe les categories comme "props"
        return Inertia::render('Categorie/Index', ['categories'=>$categories,]);
    }

    public function create()
    {
        return Inertia::render('Categorie/Create');
    }

    public function store(Request $request)
    {
        // valider le sdonnées reçu du formulaire
        $validatedData=$request->validate([
            // Nom requis, chaine, max 255 car., unique dans la table 'auteur'
            'nom'=> 'required|string|max:255|unique:categories,nom'
        ]);

        //créer l'auteur dans la base de données
        Categorie::create($validatedData); 

        //Redirige vers la liste des categories avec un message de succès
        return redirect()->route('categories.index')->with('success', 'Categorie ajouté avec succès !');
    }


    public function show(Categorie $categorie)
    {

    }

    public function edit(Categorie $categorie)
    {
        return Inertia::render('Categorie/Edit', [
            // Passe l'auteur existantau composant React
            'auteur' => $categorie,
        ]);
    }

    public function update(UpdateCategorieRequest $request, Categorie $categorie)
    {
        $validatedData=$request->validate([
            //le nom doit etre unique, Sauf pour l'auteur actuel, 
            // on ignore son propre ID
            'nom'=> 'required|string|max:255|unique:categories,nom'
        ]);

        //mettre a jour l'auteur
        $categorie->update($validatedData); 

        return redirect()->route('categories.index')->with('success', 'Categorie mis à jour avec succès !');

    }

    public function destroy(Categorie $categorie)
    {
        if ($categorie->categories()->exists()) {
            // vérifier si l'auteur a des livres associés
            return redirect()->route('categories.index')->with('error', 'Cet auteur a des livres associés et ne peut pas être supprimé.');
        }

        $categorie->delete();

        return redirect()->route('categories.index')->with('success', 'Categorie supprimé avec succès !');

    }
}
