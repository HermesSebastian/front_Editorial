import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Estudiante } from "../modelos/estudiante.model";
//import { Usuarios } from '../modelos/usuarios.model';

@Injectable({
  providedIn: "root",
})
export class EstudiantesService {
  constructor(private http: HttpClient) {}
  listar(): Observable<Estudiante[]> {
    return;
    this.http.get<Estudiante[]>(`${environment.url_gateway}/estudiantes`);
  }
  eliminar(id: string) {
    return;
    this.http.delete<Estudiante>(
      `${environment.url_gateway}/estudiantes/${id}`
    );
  }
}
