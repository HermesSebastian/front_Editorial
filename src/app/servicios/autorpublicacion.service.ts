import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Autorpublicacion } from '../modelos/autorpublicacion.model';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AutorpublicacionService {
  constructor(private http: HttpClient) { }
  listar(): Observable<Autorpublicacion[]> {
  return this.http.get<Autorpublicacion[]>(`${environment.url_gateway}/autorpublicacion`);
  }
  eliminar(id:string){
  return this.http.delete<Autorpublicacion>(`${environment.url_gateway}/autorpublicacion/${id}`,
  );
  }
  getAutorpublicacion(id: string): Observable<Autorpublicacion> {
    return this.http.get<Autorpublicacion>(`${environment.url_gateway}/autorpublicacion/${id}`);
    }
    crear(elAutorpublicacion: Autorpublicacion) {
    return this.http.post(`${environment.url_gateway}/autorpublicacion`,elAutorpublicacion);
    }
    editar(id:string,elAutorpublicacion: Autorpublicacion) {
    return this.http.put(`${environment.url_gateway}/autorpublicacion/${id}`,elAutorpublicacion);
    }
  }