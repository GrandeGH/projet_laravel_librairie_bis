import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; 
import { router } from '@inertiajs/react'

export default function Index({ auth, livres, filtres }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const { delete: destroyBook, processing: deleting } = useForm();
    const [searchTerm, setSearchTerm] = React.useState(filtres.search || '');

    function handleDelete(bookId) {
         if (confirm("Voulez-vous vraiment supprimer ce livre ?")) {
        destroyBook(route('livres.destroy', bookId), {
            method: 'delete',
            onSuccess: () => {
                // Optionnel : tu peux gérer un message ou un reload
            }
        });
    }
    }
    function handleSearch(e) {
        e.preventDefault();
        router.get(route('livres.index'), { search: searchTerm }, { preserveState: true, replace: true });
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl ...">Gestion des Livres</h2>}>
            <Head title="Livres" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Titre et bouton Ajouter */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fs-5">Liste des Livres</h3>
                                <Link href={route('livres.create')} className="btn btn-primary btn-sm">
                                    Ajouter un Livre
                                </Link>
                            </div>

                            {/* Messages Flash */}
                            {flash.success && <div className="alert alert-success mb-3">{flash.success}</div>}
                            {flash.error && <div className="alert alert-danger mb-3">{flash.error}</div>}

                            {/* Formulaire de recherche */}
                            <form onSubmit={handleSearch} className="mb-3">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Rechercher par titre..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className="btn btn-outline-secondary" type="submit">Rechercher</button>
                                    {searchTerm && (
                                        <button
                                            className="btn btn-outline-danger"
                                            type="button"
                                            onClick={() => { setSearchTerm(''); router.get(route('livres.index'), {}, { preserveState: true, replace: true }); }}
                                        >X</button>
                                    )}
                                </div>
                            </form>

                            {/* Tableau des livres */}
                            {livres.data && livres.data.length > 0 ? ( // Si pagination: books.data, sinon juste books
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                <th>Auteur</th>
                                                <th>Catégorie</th>
                                                <th>Année</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(livres.data || livres).map((livre) => ( // Adapte si pagination ou non
                                                <tr key={livre.id}>
                                                    <td>{livre.titre}</td>
                                                    <td>{livre.auteur ? livre.auteur.nom : 'N/A'}</td>
                                                    <td>{livre.categorie ? livre.categorie.nom : 'N/A'}</td>
                                                    <td>{livre.publication_annee}</td>
                                                    <td>
                                                        <Link href={route('livres.edit', livre.id)} className="btn btn-sm btn-outline-secondary me-2">Modifier</Link>
                                                        <button onClick={() => handleDelete(livre.id)} className="btn btn-sm btn-outline-danger" disabled={deleting}>Supprimer</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>Aucun livre trouvé.</p>
                            )}
                            {/* Liens de pagination (si pagination activée) */}
                            {livres.links && livres.links.length > 3 && (
                                <nav className="mt-4">
                                    <ul className="pagination">
                                        {livres.links.map((link, index) => (
                                            <li key={index} className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}>
                                                <Link className="page-link" href={link.url || '#'} dangerouslySetInnerHTML={{ __html: link.label }} />
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
