<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Role::create(['nombre' => 'admin']);
        Role::create(['nombre' => 'gerente']);
        Role::create(['nombre' => 'empleado']);
    }
}
