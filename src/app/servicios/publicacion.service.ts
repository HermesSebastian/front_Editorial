import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelos/usuario.model';
import { Publicacion } from '../modelos/publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  constructor(private http: HttpClient) { }

  getPublicacion(id: string): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${environment.url_gateway}/publicacion/${id}`);
  }
  crear(formData: FormData) {
    return this.http.post(`${environment.url_gateway}/publicacion`, formData);
  }
  
  editar(id: string, formData: FormData) {
    return this.http.put(`${environment.url_gateway}/publicacion/${id}`, formData);
  }

  listar(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${environment.url_gateway}/publicacion`);
  }

  eliminar(id: string): Observable<Publicacion> {
    return this.http.delete<Publicacion>(`${environment.url_gateway}/publicacion/${id}`);
  }

  obtenerListaPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${environment.url_gateway}/publicacion`); 
  }

  listarTitulos(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.url_gateway}/publicacion/titulos`);
  }

}
