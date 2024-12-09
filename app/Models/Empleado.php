<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_puesto',
        'nombre',
        'apellido',
        'dni',
        'telefono',
        'sueldo_basico',
        'sueldo_neto',
    ];
    protected $table = 'empleados';

    public function puesto(){
        return $this->belongsTo(Puesto::class, 'id_puesto');
    }
}
