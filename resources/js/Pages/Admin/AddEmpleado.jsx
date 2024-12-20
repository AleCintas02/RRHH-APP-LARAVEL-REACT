import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

function AddEmpleado() {
    const { data, setData, post, processing, errors, reset } = useForm({
        id_puesto: '',
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        sueldo_basico: ''
    });

    const [puestos, setPuestos] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);  // Estado para controlar si el formulario está colapsado

    // Cargar los puestos desde la ruta `/puestos`
    useEffect(() => {
        fetch('/puestos')
            .then((response) => response.json())
            .then((data) => setPuestos(data))
            .catch((error) => console.error('Error al cargar los puestos:', error));
    }, []);

    // Cargar los empleados desde la ruta '/listar-empleados'
    useEffect(() => {
        fetch('/listar-empleados')
            .then((response) => response.json())
            .then((data) => setEmpleados(data))
            .catch((error) => console.error('Error al cargar los empleados:', error));
    }, []);  // Solo cargar al inicializar

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('agregarEmpleado'), {
            onSuccess: () => {
                // Después de éxito, limpiar el formulario y recargar la lista de empleados
                reset();
                fetch('/listar-empleados')
                    .then((response) => response.json())
                    .then((data) => setEmpleados(data))
                    .catch((error) => console.error('Error al cargar los empleados:', error));
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Registrar Empleado
                    {/* Botón para alternar entre contraer y expandir el formulario */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className=" ml-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 mb-4 transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                        {isCollapsed ? 'Expandir Formulario' : 'Contraer Formulario'}
                    </button>
                </h2>

            }
        >



            {/* Formulario de empleado */}
            <div className={`max-w-2xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg mt-3 transition-all ${isCollapsed ? 'h-0 overflow-hidden' : ''}`}>

                <form onSubmit={handleSubmit}>
                    {/* Campos del formulario */}
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
                            {puestos.map((puesto) => (
                                <option key={puesto.id} value={puesto.id}>
                                    {puesto.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.id_puesto && <span className="text-red-500 text-xs">{errors.id_puesto}</span>}
                    </div>

                    {/* Resto de los campos (nombre, apellido, etc.) */}
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

                    <div className="mb-6">
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Teléfono (opcional)
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

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
                        >
                            {processing ? 'Registrando...' : 'Registrar Empleado'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Tabla de empleados */}
            <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg mt-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Lista de Empleados
                </h3>
                {empleados.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Puesto</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Nombre</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Apellido</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">DNI</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Teléfono</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Sueldo Básico</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Sueldo Neto</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map((empleado) => (
                                <tr key={empleado.id} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">{empleado.puesto.nombre}</td>
                                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">{empleado.nombre}</td>
                                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">{empleado.apellido}</td>
                                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">{empleado.dni}</td>
                                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">{empleado.telefono}</td>
                                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">{empleado.sueldo_basico}</td>
                                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">{empleado.sueldo_neto}</td>
                                    <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                                        <a
                                            href={`/editar-empleado-form/${empleado.id}`}
                                            className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                                        >
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No hay empleados registrados.</p>
                )}
            </div>

        </AuthenticatedLayout>
    );
}

export default AddEmpleado;
