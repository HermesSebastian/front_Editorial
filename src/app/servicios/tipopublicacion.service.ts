import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tipopublicacion } from '../modelos/tipopublicacion.model';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class TipopublicacionService {
  constructor(private http: HttpClient) { }
  listar(): Observable<Tipopublicacion[]> {
  return this.http.get<Tipopublicacion[]>(`${environment.url_gateway}/tipopublicacion`);
  }
  eliminar(id:string){
  return this.http.delete<Tipopublicacion>(`${environment.url_gateway}/tipopublicacion/${id}`,
  );
  }
  getTipopublicacion(id: string): Observable<Tipopublicacion> {
    return this.http.get<Tipopublicacion>(`${environment.url_gateway}/tipopublicacion/${id}`);
  }
    crear(laTipopublicacion: Tipopublicacion) {
    return this.http.post(`${environment.url_gateway}/tipopublicacion`,
    laTipopublicacion);
    }
    editar(id:string,laTipopublicacion: Tipopublicacion) {
    return this.http.put(`${environment.url_gateway}/tipopublicacion/${id}`,
    laTipopublicacion);
    }
  }
  
