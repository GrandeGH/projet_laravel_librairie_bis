<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use App\Models\Auteur;
use App\Models\Categorie;
use App\Http\Requests\StoreLivreRequest;
use App\Http\Requests\UpdateLivreRequest;
use Illuminate\Http\Request;
use Inertia\Inertia; // Important pour Inertia
use Illuminate\Validation\Rule;



class LivreController extends Controller
{

    public function index(Request $request)
    {
   $query = Livre::with(['auteur', 'categorie']);

        if ($request->has('search') && $request->input('search') != '') {
            $query->where('titre', 'LIKE', '%' . $request->input('search') . '%');
        }

        // Pour la pagination, utiliser ->paginate(10) au lieu de ->get()
        $livres = $query->orderBy('titre')->paginate(10)->withQueryString();
        $livres = $query->orderBy('titre')->get();


        return Inertia::render('Livre/Index', [
            'livres' => $livres,
            'filtres' => $request->only(['search'])
        ]);
    }


    public function create()
    {
        return Inertia::render('Livre/Create', [
            'auteurs' => Auteur::orderBy('nom')->get(),
            'categories' => Categorie::orderBy('nom')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'auteur_id' => 'required|exists:auteurs,id',
            'categorie_id' => 'required|exists:categories,id',
            'publication_annee' => 'required|integer|min:1000|max:' . date('Y'),
            'description' => 'nullable|string',
            'isbn' => 'nullable|string|max:20|unique:livres,isbn',
        ]);

        Livre::create($validatedData);
        return redirect()->route('livres.index')->with('success', 'Livre ajouté avec succès !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Livre $livre)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Livre $livre)
    {
        return Inertia::render('Livre/Edit', [
            'livres' => $livre->load(['auteur', 'categorie']), // Charger les relations si besoin
            'auteurs' => Auteur::orderBy('nom')->get(),
            'categories' => Categorie::orderBy('nom')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLivreRequest $request, Livre $livre)
    {
    $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'auteur_id' => 'required|exists:auteurs,id',
            'categorie_id' => 'required|exists:categories,id',
            'publication_annee' => 'required|integer|min:1000|max:' . date('Y'),
            'description' => 'nullable|string',
            'isbn' => ['nullable', 'string', 'max:20', Rule::unique('livres')->ignore($livre->id)],
        ]);

        $livre->update($validatedData);
        return redirect()->route('livres.index')->with('success', 'Livre mis à jour avec succès !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Livre $livre)
    {
        $livre->delete();
        return redirect()->route('livres.index')->with('success', 'Livre supprimé avec succès !');
    }
}
