import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Tipopublicacion } from '../../../modelos/tipopublicacion.model';
import { TipopublicacionService } from '../../../servicios/tipopublicacion.service';
import {  OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  tipopublicacion: Tipopublicacion[];
  nombresColumnas: string[] = ['Formato', 'Genero', 'Opciones'];

  constructor(private miServicioTipopublicacion: TipopublicacionService, private router: Router) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioTipopublicacion.listar().subscribe(data => {
      this.tipopublicacion = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/tipopublicacion/crear"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/tipopublicacion/actualizar/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'EliminarTipopublicacion',
      text: 'Está seguro que quiere eliminar el Tipopublicacion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioTipopublicacion.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El Tipopublicacion ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }
}

