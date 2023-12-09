import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Autor } from "../../../modelos/autor.model";
import { AutorService } from "../../../servicios/autor.service";
import { OnInit } from "@angular/core";

@Component({
  selector: "ngx-crear",
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.scss"],
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_autor: string = "";
  intentoEnvio: boolean = false;
  elAutor: Autor = {
    nombres: "",
    apellidos: "",
    direccion: "",
    nivelacademico: "",
    correoelectronico: "",
  };
  constructor(
    private miServicioAutor: AutorService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_autor) {
      this.modoCreacion = false;
      this.id_autor = this.rutaActiva.snapshot.params.id_autor;
      this.getAutor(this.id_autor);
    } else {
      this.modoCreacion = true;
    }
  }
  getAutor(id: string) {
    this.miServicioAutor.getAutor(id).subscribe((data) => {
      this.elAutor = data;
    });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioAutor.crear(this.elAutor).subscribe((data) => {
        Swal.fire("Creado", "El autor ha sido creado correctamente", "success");
        this.router.navigate(["pages/autor/listar"]);
      });
    }
  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioAutor
        .editar(this.elAutor._id, this.elAutor)
        .subscribe((data) => {
          Swal.fire(
            "Actualizado",
            "El autor ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/autor/listar"]);
        });
    }
  }
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      //this.elAutor.cedula == "" ||
      this.elAutor.nombres == "" ||
      this.elAutor.apellidos == "" ||
      this.elAutor.direccion == "" ||
      this.elAutor.nivelacademico == "" ||
      this.elAutor.correoelectronico == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
