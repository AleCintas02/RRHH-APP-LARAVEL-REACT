<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Empleado;

class EmpleadosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empleados = Empleado::with('puesto')->get()->map(function($empleado){

            $porcentaje = $empleado->sueldo_basico * 0.21;
            $sueldo_neto = $empleado->sueldo_basico - $porcentaje;

            $empleado->sueldo_neto = $sueldo_neto;

            return $empleado;
        });
        return response()->json($empleados);   
    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AddEmpleado'); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try{
            $validate = $request->validate([
                'id_puesto' =>'required|exists:puestos,id',
                'nombre' => 'required|string|max:255',
                'apellido' => 'required|string|max:255',
                'dni' => 'required|string|max:20|unique:empleados,dni',
                'telefono' => 'nullable|string|max:20',
                'sueldo_basico' => 'required|numeric',
            ]);


    
            Empleado::create($validate);
    
            return redirect()->route('agregarEmpleado')->with('success', 'Empleado registrado correctamente.');
        }catch(\Exeption $e){
            return redirect()->route('agregarEmpleado')->with('success', 'Error al ingresar el empleado');
        }
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
