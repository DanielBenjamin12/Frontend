import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateInvoice, IInvoice, InvoiceResponse } from '../../Interface/Invoice.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor( private readonly http: HttpClient) { }

  //Obtener todas las facturas
  getAllInvoice(): Observable<InvoiceResponse[]> {
    return this.http.get<InvoiceResponse[]>(``);
  }

  //Obtener una factura por id
  getInvoiceById(id: number): Observable<IInvoice> {
    return this.http.get<IInvoice>(``);
  }

  //Crear una factura
  createInvoice(paylod: CreateInvoice):Observable<InvoiceResponse>{
    return this.http.post<InvoiceResponse>(
      ``,
      paylod
    )
  }


  //Borrar una factura por id
  deleteInvoiceById(id: number){
    return this.http.delete(``)
  }

}
