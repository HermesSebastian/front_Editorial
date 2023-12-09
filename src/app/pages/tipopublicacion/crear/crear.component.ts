import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Tipopublicacion } from '../../../modelos/tipopublicacion.model';
import { TipopublicacionService } from '../../../servicios/tipopublicacion.service';
import {OnInit } from '@angular/core';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_tipopublicacion: string = "";
  intentoEnvio: boolean = false;
  laTipopublicacion: Tipopublicacion = {
    formato: "",
    genero: ""
  };

  constructor(
    private miServicioTipopublicacion: TipopublicacionService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_tipopublicacion) {
      this.modoCreacion = false;
      this.id_tipopublicacion = this.rutaActiva.snapshot.params.id_tipopublicacion;
      this.getTipopublicacion(this.id_tipopublicacion);
    } else {
      this.modoCreacion = true;
    }
  }

  getTipopublicacion(id: string): void {
    this.miServicioTipopublicacion.getTipopublicacion(id)
      .subscribe(data => {
        this.laTipopublicacion = data;
      });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioTipopublicacion.crear(this.laTipopublicacion)
        .subscribe(data => {
          Swal.fire(
            'Creado',
            'El Tipo Publicacion ha sido creado correctamente',
            'success'
          );
          this.router.navigate(["pages/tipopublicacion/listar"]);
        });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioTipopublicacion.editar(this.laTipopublicacion._id, this.laTipopublicacion)
        .subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El Tipo publicacion  ha sido actualizado correctamente',
            'success'
          );
          this.router.navigate(["pages/tipopublicacion/listar"]);
        });
    }
  }

  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      this.laTipopublicacion.formato === "" ||
      this.laTipopublicacion.genero === "" 
    ) {
      return false;
    } else {
      return true;
    }
  }
}
