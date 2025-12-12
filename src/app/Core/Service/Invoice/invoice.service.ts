import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateInvoice, IInvoice, InvoiceResponse } from '../../Interface/Invoice.interface';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../Const';
BASE_API_URL

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor( private readonly http: HttpClient) { }

  //Obtener todas las facturas
  getAllInvoice(): Observable<InvoiceResponse[]> {
    return this.http.get<InvoiceResponse[]>(`${BASE_API_URL}Facturas`);
  }

  //Obtener una factura por id
  getInvoiceById(id: number): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(`${BASE_API_URL}Facturas/${id}`);
  }

  //Crear una factura
  createInvoice(paylod: CreateInvoice):Observable<InvoiceResponse>{
    return this.http.post<InvoiceResponse>(
      `${BASE_API_URL}Facturas`,
      paylod
    )
  }


  //Borrar una factura por id
  deleteInvoiceById(id: number){
    return this.http.delete(`${BASE_API_URL}Facturas/${id}`)
  }

}
