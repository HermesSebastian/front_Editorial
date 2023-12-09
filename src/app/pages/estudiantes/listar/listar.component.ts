import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Estudiante } from '../../../modelos/estudiante.model';
import { EstudiantesService } from '../../../servicios/estudiantes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  estudiantes : Estudiante[]; // Arreglo que almacenará la lista de estudiantes
  nombresColumnas: string[] = ['Cedula','Nombre','Apellido','Opciones']; // Nombres de las columnas de la tabla
  constructor(private miServicioEstudiantes: EstudiantesService, private router: Router) { }

  ngOnInit(): void {
    this.listar(); // Llama al método listar() al inicializar el componente
  }
  listar():void{
    // Llama al servicio de estudiantes para obtener la lista de estudiantes
    this.miServicioEstudiantes.listar().
      subscribe(data => {
        this.estudiantes=data; // Almacena la lista de estudiantes en la variable estudiantes
      });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/estudiantes/crear"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/estudiantes/actualizar/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Estudiante',
      text: "Está seguro que quiere eliminar el estudiante?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      //if (result.isConfirmed) {
        //this.miServicioEstudiantes.eliminar(id).
          //subscribe(data => {
            //Swal.fire(
              //'Eliminado!',
              //'El estudiante ha sido eliminada correctamente',
              //'success'
           // )
            //this.ngOnInit();// Vuelve a cargar la lista de estudiantes después de eliminar uno
         // });
      //}
    })
  }
}
