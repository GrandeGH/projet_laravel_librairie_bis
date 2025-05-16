import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; 
// Layout de Breeze

export default function Index({ auth, auteurs }) { // 'auth' et 'authors' sont des props passées par le contrôleur
    const { props } = usePage(); // Pour accéder à toutes les props, y compris les messages flash
    const flash = props.flash || {};

    const { delete: destroyAuthor, processing } = useForm(); // Pour la suppression

    function handleDelete(authorId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet auteur ?')) {
            destroyAuthor(route('auteurs.destroy', authorId), {
                preserveScroll: true, // Garde la position de défilement après redirection
            });
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Gestion des Auteurs</h2>}
        >
            <Head title="Auteurs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fs-5">Liste des Auteurs</h3>
                                <Link href={route('auteurs.create')} className="btn btn-primary btn-sm">
                                    Ajouter un Auteur
                                </Link>
                            </div>

                            {flash.success && (
                                <div className="alert alert-success mb-3">
                                    {flash.success}
                                </div>
                            )}
                            {flash.error && (
                                <div className="alert alert-danger mb-3">
                                    {flash.error}
                                </div>
                            )}

                            {auteurs.length > 0 ? (
                                <ul className="list-group">
                                    {auteurs.map((auteur) => (
                                        <li key={auteur.id} className="list-group-item d-flex justify-content-between align-items-center dark:bg-gray-700 dark:text-gray-300">
                                            {auteur.nom}
                                            <div>
                                                <Link
                                                    href={route('auteurs.edit', auteur.id)}
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                >
                                                    Modifier
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(auteur.id)}
                                                    className="btn btn-sm btn-outline-danger"
                                                    disabled={processing}
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucun auteur trouvé.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
