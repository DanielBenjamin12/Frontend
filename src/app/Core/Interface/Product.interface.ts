import { IInvoiceDetail } from "./InvoiceDetail.interface";


export interface IProduct {
  Id: number;
  Nombre: string;
  PrecioUnitario: number;
  Stock: number

  InvoiceDetail: IInvoiceDetail[];
}


export type CreateProduct = Omit<IProduct, 'Id'>


export type UpdateProduct = {
  Nombre?: string;
  PrecioUnitario?: number;
  Stock?: number;

  InvoiceDetail: IInvoiceDetail[];
}
