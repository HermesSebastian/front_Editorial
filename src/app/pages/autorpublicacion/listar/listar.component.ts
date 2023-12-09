import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Autorpublicacion } from '../../../modelos/autorpublicacion.model';
import { AutorpublicacionService } from '../../../servicios/autorpublicacion.service';
import {  OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  autorpublicacion: Autorpublicacion[];
  nombresColumnas: string[] = ['Volumen', 'Descripcion', 'Numero paginas', 'Opciones'];

  constructor(private miServicioAutorpublicacion: AutorpublicacionService, private router:Router) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioAutorpublicacion.listar().subscribe(data => {
      this.autorpublicacion = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/autorpublicacion/crear"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/autorpublicacion/actualizar/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Estudiante',
      text: 'Está seguro que quiere eliminar el Autorpublicacion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioAutorpublicacion.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El Autorpublicacion ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }
}
