import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

function AddPuesto() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
    });

    const [puestos, setPuestos] = useState([]);

    // Cargar los puestos al inicializar el componente
    useEffect(() => {
        fetch('/puestos')
            .then((response) => response.json())
            .then((data) => setPuestos(data))
            .catch((error) => console.error('Error al cargar los puestos:', error));
    }, []);

    // Función para manejar el formulario de creación de puesto
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('agregarPuestoStore'), {
            onSuccess: () => {
                // Al registrarse correctamente el puesto, volver a cargar los puestos
                fetch('/puestos')
                    .then((response) => response.json())
                    .then((data) => setPuestos(data))
                    .catch((error) => console.error('Error al cargar los puestos:', error));
            },
        });
    };

    // Función para eliminar un puesto
    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este puesto?")) {
            fetch(`/puestoa/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
            })
            .then((response) => {
                if (response.ok) {
                    // Actualizar la lista de puestos después de eliminar uno
                    setPuestos(puestos.filter((puesto) => puesto.id !== id));
                    alert("Puesto eliminado correctamente.");
                } else {
                    alert("Hubo un error al intentar eliminar el puesto.");
                }
            })
            .catch((error) => console.error("Error al eliminar el puesto:", error));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Registrar Puesto
                </h2>
            }
        >
            {/* Formulario para crear un nuevo puesto */}
            <div className="max-w-2xl mx-auto px-6 py-8 bg-white shadow-md rounded-lg mt-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="nombre"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Nombre del puesto
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                        {errors.nombre && (
                            <span className="text-red-500 text-xs">{errors.nombre}</span>
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {processing ? 'Registrando...' : 'Registrar Puesto'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Lista de puestos con botón para eliminar */}
            <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-md rounded-lg mt-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Lista de Puestos
                </h3>
                {puestos.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {puestos.map((puesto) => (
                            <li key={puesto.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {puesto.nombre}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {puesto.descripcion}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(puesto.id)}
                                    className="py-1 px-2 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No hay puestos disponibles.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

export default AddPuesto;
