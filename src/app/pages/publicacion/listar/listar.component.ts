import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Publicacion } from '../../../modelos/publicacion.model';
import { PublicacionService } from '../../../servicios/publicacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  publicacion: Publicacion[]; // Declaración de la variable publicacion
  nombresColumnas: string[] = ['Titulo', 'Isbn', 'Fecha','Programa', 'Opciones'];

  constructor(private miServicioPublicacion: PublicacionService, private router: Router) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miServicioPublicacion.listar().subscribe(data => {
      this.publicacion = data;
    });
  }

  agregar(): void {
    console.log("agregando nuevo");
    this.router.navigate(["pages/publicacion/crear"]);
  }

  editar(id: string): void {
    console.log("editando a " + id);
    this.router.navigate(["pages/publicacion/actualizar/"+id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Publicacion',
      text: "Está seguro que quiere eliminar la Publicacion?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioPublicacion.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'La Publicacion ha sido eliminado correctamente',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }
}
