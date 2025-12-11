import { IInvoiceDetail } from "./InvoiceDetail.interface";


export interface IProduct {
  id: number;
  nombre: string;
  precioUnitario: number;
  stock: number
}


export type CreateProduct = Omit<IProduct, 'id'>


export type UpdateProduct = {
  nombre?: string;
  precioUnitario?: number;
  stock?: number;
}
