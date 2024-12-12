<?php

use App\Http\Middleware\CheckAdmin;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Admin\PuestosController;
use App\Http\Controllers\Admin\EmpleadosController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

Route::middleware([CheckAdmin::class])->group(function(){
    Route::get('register', [RegisteredUserController::class, 'create'])
    ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);


    //puestos
    Route::get('/agregar-puesto', [PuestosController::class, 'create'])->name('agregarPuesto');
    Route::post('/agregar-puesto', [PuestosController::class, 'store'])->name('agregarPuestoStore');
    Route::get('/puestos', [PuestosController::class, 'index'])->name('puestos');
    Route::delete('/puesto/{id}', [PuestosController::class, 'destroy'])->name('puestos.destroy'); 
    Route::put('/editar-puesto/{id}', [PuestoController::class, 'update'])->name('editarEmpleado');


    //empleados
    Route::get('/agregar-empleado', [EmpleadosController::class, 'create'])->name('agregarEmpleadoForm');
    Route::post('/agregar-empleado', [EmpleadosController::class, 'store'])->name('agregarEmpleado');
    Route::get('/listar-empleados', [EmpleadosController::class, 'index'])->name('listarEmpleados');
    Route::delete('/eliminar-empleado/{id}', [EmpleadosController::class, 'destroy'])->name('eliminarEmpleado');
    Route::get('/editar-empleado-form/{id}', [EmpleadosController::class, 'edit'])->name('editarEmpleadoForm');
    Route::put('/editar-empleado/{id}', [EmpleadosController::class, 'update'])->name('editarEmpleado');
});
    



require __DIR__.'/auth.php';
