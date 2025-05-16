<?php

namespace App\Http\Controllers;

use App\Models\Auteur;
use App\Http\Requests\StoreAuteurRequest;
use App\Http\Requests\UpdateAuteurRequest;
use Illuminate\Http\Request;
use Inertia\Inertia; // Important pour Inertia

class AuteurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // récupère tous les auteurs, triés par nom
        $auteurs = Auteur::orderBy('nom')->get();
        // Rend le composant React 'Authors/Index.jsx' et lui passe les auteurs comme "props"
        return Inertia::render('Auteur/Index', ['auteurs'=>$auteurs,]);
    }

    public function create()
    {
        return Inertia::render('Auteur/Create');
    }


    public function store(Request $request)
    {
        // valider le sdonnées reçu du formulaire
        $validatedData=$request->validate([
            // Nom requis, chaine, max 255 car., unique dans la table 'auteur'
            'nom'=> 'required|string|max:255|unique:auteurs,nom'
        ]);

        //créer l'auteur dans la base de données
        Auteur::create($validatedData); 

        //Redirige vers la liste des auteurs avec un message de succès
        return redirect()->route('auteurs.index')->with('success', 'Auteur ajouté avec succès !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Auteur $auteur)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Auteur $auteur)
    {
        return Inertia::render('Auteur/Edit', [
            // Passe l'auteur existantau composant React
            'auteur' => $auteur,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuteurRequest $request, Auteur $auteur)
    {
        $validatedData=$request->validate([
            //le nom doit etre unique, Sauf pour l'auteur actuel, 
            // on ignore son propre ID
            'nom'=> 'required|string|max:255|unique:auteurs,nom'
        ]);

        //mettre a jour l'auteur
        $auteur->update($validatedData); 

        return redirect()->route('auteurs.index')->with('success', 'Auteur mis à jour avec succès !');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Auteur $auteur)
    {
        if ($auteur->auteurs()->exists()) {
            // vérifier si l'auteur a des livres associés
            return redirect()->route('auteurs.index')->with('error', 'Cet auteur a des livres associés et ne peut pas être supprimé.');
        }

        $auteur->delete();

        return redirect()->route('auteurs.index')->with('success', 'Auteur supprimé avec succès !');

    }
}
