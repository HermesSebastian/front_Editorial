import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Publicacion } from '../../../modelos/publicacion.model';
import { PublicacionService } from '../../../servicios/publicacion.service';
import { OnInit } from "@angular/core";
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent {
  modoCreacion: boolean = true;
  id_publicacion: string = "";
  intentoEnvio: boolean = false;
  lapublicacion: Publicacion = {
    titulo: "",
    isbn: "",
    fecha: "",
    programa: ""
  };
  archivoSeleccionado: File;

  constructor(
    private miServicioPublicacion: PublicacionService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_publicacion) {
      this.modoCreacion = false;
      this.id_publicacion = this.rutaActiva.snapshot.params.id_publicacion;
      this.getPublicacion(this.id_publicacion);
    } else {
      this.modoCreacion = true;
    }
  }

  getPublicacion(id: string): void {
    this.miServicioPublicacion.getPublicacion(id).subscribe(data => {
      this.lapublicacion = data;
    });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;

      const formData = new FormData();
      formData.append('titulo', this.lapublicacion.titulo);
      formData.append('isbn', this.lapublicacion.isbn);
      formData.append('fecha', this.lapublicacion.fecha);
      formData.append('programa', this.lapublicacion.programa);

      if (this.archivoSeleccionado) {
        formData.append('archivo', this.archivoSeleccionado, this.archivoSeleccionado.name);
      }

      this.miServicioPublicacion.crear(formData).subscribe(data => {
        Swal.fire(
          'Creado',
          'La publicación ha sido creada correctamente',
          'success'
        );
        this.router.navigate(["pages/publicacion/listar"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      const formData = new FormData();
      formData.append('titulo', this.lapublicacion.titulo);
      formData.append('isbn', this.lapublicacion.isbn);
      formData.append('fecha', this.lapublicacion.fecha);
      formData.append('programa', this.lapublicacion.programa);

      if (this.archivoSeleccionado) {
        formData.append('archivo', this.archivoSeleccionado, this.archivoSeleccionado.name);
      }

      this.miServicioPublicacion.editar(this.lapublicacion._id, formData).subscribe(data => {
        Swal.fire(
          'Actualizada',
          'La publicación ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate(["pages/publicacion/listar"]);
      });
    }
  }

  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      this.lapublicacion.titulo === "" ||
      this.lapublicacion.isbn === "" ||
      this.lapublicacion.fecha === "" ||
      this.lapublicacion.programa === ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  onFileSelected(event): void {
    this.archivoSeleccionado = event.target.files[0];
  }
}