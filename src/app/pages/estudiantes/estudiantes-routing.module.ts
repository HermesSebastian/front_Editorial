import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  {
    path:'listar', // Ruta para listar estudiantes
    component: ListarComponent // Componente asociado a la ruta de listar
  },
  {
    path:'crear', // Ruta para crear un estudiante
   // component: CrearComponent // Componente asociado a la ruta de crear
  },
  {
    path:'actualizar/:id_estudiante', // Ruta para actualizar un estudiante (se espera un parámetro "id_estudiante")
    //component: CrearComponent // Componente asociado a la ruta de actualizar
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importación del módulo de enrutamiento y configuración de las rutas definidas
  exports: [RouterModule] // Exportación del módulo de enrutamiento para su uso en otros módulos
})
export class EstudiantesRoutingModule { }
