<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Puesto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class PuestosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $puestos = Puesto::all();
        return response()->json($puestos);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AddPuesto');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255'
        ]);
        Puesto::create([
            'nombre' => $validated['nombre']
        ]);

        return redirect()->route('agregarPuesto')->with('success', 'Puesto registrado');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

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
        $puesto = Puesto::findOrFail($id);
        $puesto->delete();

        return response()->json(['message' => 'Puesto eliminado'], 200);



    }
}
