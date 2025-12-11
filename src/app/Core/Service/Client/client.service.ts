import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateClient, IClient, UpdateClient } from '../../Interface/Client.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private readonly http: HttpClient) { }

  //Obtener todos los clientes
  getAllClient(): Observable<IClient[]> {
    const request = this.http.get<IClient[]>(``);
    return request;
  }

  //Obtener un cliente por id
  getClientById(id: number): Observable<IClient> {
    const request = this.http.get<IClient>(``);
    return request;
  }

  //Crear un nuevo cliente
  createClient(paylod: CreateClient): Observable<IClient> {
    return this.http.post<IClient>(
      ``,
      paylod,
    );
  }

  //Actualizar un cliente
  updateClienteById(id: number, paylod: UpdateClient) {
    return this.http.put<UpdateClient>(
      ``,
      paylod
    );
  }

  //Borrar un cliente
  deleteClientById(id: number) {
    const request = this.http.delete(``)
    return request;
  }

}

