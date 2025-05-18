import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError'; // Composant d'erreur de Breeze
import PrimaryButton from '@/Components/PrimaryButton'; // Bouton de Breeze
import TextInput from '@/Components/TextInput'; // Champ de texte de Breeze
import InputLabel from '@/Components/InputLabel'; // Label de Breeze

export default function Create({ auth, auteurs, categories }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        titre: '',
        auteur_id: '',
        categorie_id: '',
        publication_annee: '',
        description: '',
        isbn: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('livres.store'), { // 'post' est une méthode de useForm pour envoyer les données
            onSuccess: () => {
                // Optionnel : réinitialiser le formulaire ou autre action après succès
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-black dark:text-gray-200 leading-tight">Ajouter un livre</h2>}
        >
            <Head title="Ajouter Categorie" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {recentlySuccessful && (
                                <div className="alert alert-success mb-3">Auteur ajouté avec succès !</div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <InputLabel htmlFor="nom" value="Titre du livre" />
                                    <TextInput
                                        id="titre"
                                        type="text"
                                        name="titre"
                                        value={data.titre}
                                        className="mt-1 block w-full form-control" // form-control pour style Bootstrap
                                        isFocused={true}
                                        onChange={(e) => setData('titre', e.target.value)}
                                    />
                                    <InputError message={errors.titre} className="mt-2" />
                                </div>

                                {/* auteur */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="auteur_id" value="Auteur" />
                                    <select
                                        id="auteur_id"
                                        name="auteur_id"
                                        value={data.auteur_id}
                                        className="mt-1 block w-full form-select"
                                        onChange={e => setData('auteur_id', e.target.value)}
                                    >
                                        <option value="">Sélectionner un auteur</option>
                                        {auteurs.map(auteur => (
                                            <option key={auteur.id} value={auteur.id}>
                                                {auteur.nom}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.auteur_id} className="mt-2" />
                                </div>

                                {/* categorie */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="categorie_id" value="Catégorie" />
                                    <select
                                        id="categorie_id"
                                        name="categorie_id"
                                        value={data.categorie_id}
                                        className="mt-1 block w-full form-select"
                                        onChange={e => setData('categorie_id', e.target.value)}
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.map(categorie => (
                                            <option key={categorie.id} value={categorie.id}>
                                                {categorie.nom}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.categorie_id} className="mt-2" />
                                </div>

                                {/* publication année */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="publication_annee" value="Année de publication" />
                                    <TextInput
                                        id="publication_annee"
                                        type="number"
                                        name="publication_annee"
                                        value={data.publication_annee}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('publication_annee', e.target.value)}
                                    />
                                    <InputError message={errors.publication_annee} className="mt-2" />
                                </div>

                                {/* description */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full form-textarea"
                                        onChange={e => setData('description', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* isbn */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="isbn" value="ISBN" />
                                    <TextInput
                                        id="isbn"
                                        type="text"
                                        name="isbn"
                                        value={data.isbn}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('isbn', e.target.value)}
                                    />
                                    <InputError message={errors.isbn} className="mt-2" />
                                </div>




                                <div className="d-flex justify-content-end mt-4">
                                    <Link href={route('livres.index')} className="btn btn-secondary me-2">
                                        Annuler
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
