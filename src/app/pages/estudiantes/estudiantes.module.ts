import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
/*import { CrearComponent } from './crear/crear.component';*/
import { ListarComponent } from './listar/listar.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    /*CrearComponent, // Componente de creación de estudiantes*/
    ListarComponent // Componente de listado de estudiantes
  ],
  imports: [
    CommonModule, // Módulo común de Angular
    EstudiantesRoutingModule, // Módulo de enrutamiento específico para estudiantes
    NbCardModule, // Módulo de tarjeta de Nebular UI
    FormsModule // Módulo de formularios de Angular
  ]
})
export class EstudiantesModule { }
