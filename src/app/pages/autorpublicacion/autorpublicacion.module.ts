import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorpublicacionRoutingModule } from './autorpublicacion-routing.module';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    AutorpublicacionRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class AutorpublicacionModule { }
