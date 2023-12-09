import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Autor } from '../modelos/autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http: HttpClient) { }

  listarAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${environment.url_gateway}/autor`);
  }

  getAutor(id: string): Observable<Autor> {
    return this.http.get<Autor>(`${environment.url_gateway}/autor/${id}`);
  }
    crear(elAutor: Autor) {
    return this.http.post(`${environment.url_gateway}/autor`, elAutor);
    }
    editar(id:string,elAutor: Autor) {
    return this.http.put(`${environment.url_gateway}/autor/${id}`,elAutor);
    }

  listar(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${environment.url_gateway}/autor`);
  }

  eliminar(id: string): Observable<Autor> {
    return this.http.delete<Autor>(`${environment.url_gateway}/autor/${id}`);
  }
  listarNombres(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.url_gateway}/autor/nombres`);
  }

}

