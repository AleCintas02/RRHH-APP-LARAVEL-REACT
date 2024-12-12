import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

function FormEditEmpleado({ empleado = { puestos: [] } }) {
    const { data, setData, put, processing, errors } = useForm({
        id_puesto: empleado?.id_puesto || '',
        nombre: empleado?.nombre || '',
        apellido: empleado?.apellido || '',
        dni: empleado?.dni || '',
        telefono: empleado?.telefono || '',
        sueldo_basico: empleado?.sueldo_basico || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('editarEmpleado', empleado.id), {
            onSuccess: () => {
                console.log('Empleado actualizado correctamente');
            },
        });
    };

    if (!empleado) {
        return <div>Cargando datos...</div>;
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Editar Empleado
                </h2>
            }
        >
            <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg mt-8">
                <form onSubmit={handleSubmit}>
                    {/* Campo: Puesto */}
                    <div className="mb-6">
                        <label htmlFor="id_puesto" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Puesto
                        </label>
                        <select
                            id="id_puesto"
                            name="id_puesto"
                            value={data.id_puesto}
                            onChange={(e) => setData('id_puesto', e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                            required
                        >
                            <option value="">Seleccione un puesto</option>
                            {empleado?.puestos?.map((puesto) => (
                                <option key={puesto.id} value={puesto.id}>
                                    {puesto.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.id_puesto && <span className="text-red-500 text-xs">{errors.id_puesto}</span>}
                    </div>

                    {/* Campo: Nombre */}
                    <div className="mb-6">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                        {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre}</span>}
                    </div>

                    {/* Campo: Apellido */}
                    <div className="mb-6">
                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={data.apellido}
                            onChange={(e) => setData('apellido', e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                        {errors.apellido && <span className="text-red-500 text-xs">{errors.apellido}</span>}
                    </div>

                    {/* Campo: DNI */}
                    <div className="mb-6">
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={data.dni}
                            onChange={(e) => setData('dni', e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                        {errors.dni && <span className="text-red-500 text-xs">{errors.dni}</span>}
                    </div>

                    {/* Campo: Teléfono */}
                    <div className="mb-6">
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            value={data.telefono}
                            onChange={(e) => setData('telefono', e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                        />
                        {errors.telefono && <span className="text-red-500 text-xs">{errors.telefono}</span>}
                    </div>

                    {/* Campo: Sueldo Básico */}
                    <div className="mb-6">
                        <label htmlFor="sueldo_basico" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Sueldo Básico
                        </label>
                        <input
                            type="number"
                            id="sueldo_basico"
                            name="sueldo_basico"
                            value={data.sueldo_basico}
                            onChange={(e) => setData('sueldo_basico', e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                        {errors.sueldo_basico && <span className="text-red-500 text-xs">{errors.sueldo_basico}</span>}
                    </div>

                    {/* Botón de Enviar */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar Empleado'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

export default FormEditEmpleado;
