import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateClient, IClient, UpdateClient } from '../../Interface/Client.interface';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../Const';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private readonly http: HttpClient) { }

  //Obtener todos los clientes
  getClients(): Observable<IClient[]> {
    const request = this.http.get<IClient[]>(`${BASE_API_URL}Clientes`);
    return request;
  }

  //Obtener un cliente por id
  getClientById(id: number): Observable<IClient> {
    const request = this.http.get<IClient>(`${BASE_API_URL}Clientes/${id}`);
    return request;
  }

  //Crear un nuevo cliente
  createClient(paylod: CreateClient): Observable<IClient> {
    return this.http.post<IClient>(
      `${BASE_API_URL}Clientes`,
      paylod,
    );
  }

  //Actualizar un cliente
  updateClienteById(id: number, paylod: UpdateClient) {
    return this.http.put<UpdateClient>(
      `${BASE_API_URL}Clientes/${id}`,
      paylod
    );
  }

  //Borrar un cliente
  deleteClient(id: number) {
    const request = this.http.delete(`${BASE_API_URL}Clientes/${id}`);
    return request;
  }

}

