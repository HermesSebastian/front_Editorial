import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Autor } from '../../../modelos/autor.model';
import { AutorService } from '../../../servicios/autor.service';
import {  OnInit } from '@angular/core';
/*import { routes } from '../../../app-routing.module';*/
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  autor: Autor[];
  nombresColumnas: string[] = ['Nombres', 'Apellidos','Direccion','NivelAcademico','CorreoElecronico' ,'Opciones'];

  constructor(private miServicioAutor: AutorService, private router: Router) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioAutor.listar()
      .subscribe(data => {
        this.autor = data;
      });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/autor/crear"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/autor/actualizar/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Autor',
      text: 'Está seguro que quiere eliminar el Autor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioAutor.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El autor ha sido eliminado correctamente',
              'success'
            );
            this.ngOnInit();
          });
      }
    });
  }
}
