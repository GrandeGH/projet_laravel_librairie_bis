import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError'; // Composant d'erreur de Breeze
import PrimaryButton from '@/Components/PrimaryButton'; // Bouton de Breeze
import TextInput from '@/Components/TextInput'; // Champ de texte de Breeze
import InputLabel from '@/Components/InputLabel'; // Label de Breeze

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('categories.store'), { // 'post' est une méthode de useForm pour envoyer les données
            onSuccess: () => {
                // Optionnel : réinitialiser le formulaire ou autre action après succès
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Ajouter une Catégorie</h2>}
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
                                    <InputLabel htmlFor="nom" value="Nom de la catégorie" />
                                    <TextInput
                                        id="nom"
                                        type="text"
                                        name="nom"
                                        value={data.nom}
                                        className="mt-1 block w-full form-control" // form-control pour style Bootstrap
                                        isFocused={true}
                                        onChange={(e) => setData('nom', e.target.value)}
                                    />
                                    <InputError message={errors.nom} className="mt-2" />
                                </div>

                                <div className="d-flex justify-content-end mt-4">
                                    <Link href={route('categories.index')} className="btn btn-secondary me-2">
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
