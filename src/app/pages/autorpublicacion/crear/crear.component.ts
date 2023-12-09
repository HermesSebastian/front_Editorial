import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Autorpublicacion } from '../../../modelos/autorpublicacion.model';
import { AutorpublicacionService } from '../../../servicios/autorpublicacion.service';
import { AutorService } from '../../../servicios/autor.service';
import { PublicacionService } from '../../../servicios/publicacion.service';
import {OnInit } from '@angular/core';
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_autorpublicacion: string = "";
  intentoEnvio: boolean = false;
  elAutorpublicacion: Autorpublicacion = {
    volumen: "",
    descripcion: "",
    numeropaginas: "",
    nombre_autor_ingresado: "", // Nombre del autor ingresado
    titulo_publicacion_ingresado: "" // Título de la publicación     // Ajusta según la propiedad correspondiente en tu modelo
  };

  nombreAutorIngresado: string = "";
  tituloPublicacionIngresado: string = "";

  nombresAutores: string[] = [];
  titulosPublicaciones: string[] = [];
  constructor(
    private miServicioAutorpublicacion: AutorpublicacionService,
    private miServicioAutor: AutorService,
    private miServicioPublicacion: PublicacionService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAutor();
    if (this.rutaActiva.snapshot.params.id_autorpublicacion) {
      this.modoCreacion = false;
      this.id_autorpublicacion = this.rutaActiva.snapshot.params.id_autorpublicacion;
      this.getAutorpublicacion(this.id_autorpublicacion);
    } else {
      this.modoCreacion = true;
    }

    this.miServicioAutor.listarNombres().subscribe(nombres => {
      this.nombresAutores = nombres;
    });

    this.miServicioPublicacion.listarTitulos().subscribe(titulos => {
      this.titulosPublicaciones = titulos;
    });
  }
 private  getAutor():void{
  this.miServicioAutor.listar().subscribe(autores=>{
    console.log(autores);
  })


 }
  getAutorpublicacion(id: string): void {
    this.miServicioAutorpublicacion.getAutorpublicacion(id)
      .subscribe(data => {
        this.elAutorpublicacion = data;
      });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;

      // Asignar los valores ingresados al modelo
      this.elAutorpublicacion.nombre_autor_ingresado = this.nombreAutorIngresado;
      this.elAutorpublicacion.titulo_publicacion_ingresado = this.tituloPublicacionIngresado;

      // Enviar el modelo al servicio
      this.miServicioAutorpublicacion.crear(this.elAutorpublicacion)
        .subscribe(data => {
          Swal.fire(
            'Creado',
            'El Autorpublicacion ha sido creado correctamente',
            'success'
          );
          this.router.navigate(["pages/autorpublicacion/listar"]);
        });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioAutorpublicacion.editar(this.elAutorpublicacion._id, this.elAutorpublicacion)
        .subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El Autorpublicacion ha sido actualizado correctamente',
            'success'
          );
          this.router.navigate(["pages/autorpublicacion/listar"]);
        });
    }
  }

  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      this.elAutorpublicacion.volumen === "" ||
      this.elAutorpublicacion.descripcion === "" ||
      this.elAutorpublicacion.numeropaginas === "" ||
      this.elAutorpublicacion.nombre_autor_ingresado === "" ||
      this.elAutorpublicacion.titulo_publicacion_ingresado === ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}