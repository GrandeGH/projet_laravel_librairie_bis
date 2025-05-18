import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, livre, auteurs, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        titre: livre.titre || '',
        publication_annee: livre.publication_annee || '',
        auteur_id: livre.auteur_id || '',
        categorie_id: livre.categorie_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('livres.update', livre.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl">Modifier Livre</h2>}>
            <Head title="Modifier Livre" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="titre" value="Titre" />
                                <TextInput
                                    id="titre"
                                    name="titre"
                                    value={data.titre}
                                    onChange={(e) => setData('titre', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.titre} className="mt-2" />
                            </div>

                            {/* publication année */}
                            <div className="mb-4">
                                <InputLabel htmlFor="publication_annee" value="Année de publication" />
                                <TextInput
                                    id="publication_annee"
                                    name="publication_annee"
                                    type="number"
                                    value={data.publication_annee}
                                    onChange={(e) => setData('publication_annee', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.publication_annee} className="mt-2" />
                            </div>

                            {/* À remplacer par des <select> avec liste des auteurs/catégories si tu veux */}
                            <div className="mb-4">
                                <InputLabel htmlFor="auteur_id" value="Auteur" />
                                    <select
                                        id="auteur_id"
                                        name="auteur_id"
                                        value={data.auteur_id}
                                        onChange={(e) => setData('auteur_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">-- Choisir un auteur --</option>
                                        {auteurs.map((auteur) => (
                                            <option key={auteur.id} value={auteur.id}>
                                                {auteur.nom}
                                            </option>
                                        ))}
                                    </select>
                                <InputError message={errors.auteur_id} className="mt-2" />
                            </div>

                            {/* catégorie */}
                            <div className="mb-4">
                                <InputLabel htmlFor="categorie_id" value="Catégorie" />
                                    <select
                                        id="categorie_id"
                                        name="categorie_id"
                                        value={data.categorie_id}
                                        onChange={(e) => setData('categorie_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">-- Choisir une categorie --</option>
                                        {categories.map((categorie) => (
                                            <option key={categorie.id} value={categorie.id}>
                                                {categorie.nom}
                                            </option>
                                        ))}
                                    </select>
                                <InputError message={errors.categorie_id} className="mt-2" />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link href={route('livres.index')} className="btn btn-secondary">
                                    Annuler
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Mise à jour...' : 'Mettre à jour'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
