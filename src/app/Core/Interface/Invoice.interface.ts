import { IClient } from "./Client.interface";
import { IInvoiceDetail } from "./InvoiceDetail.interface";

export interface IInvoice {
  id: number;
  ClienteId: number;
  Fecha: Date;
  TotalBruto: number;
  Impuesto: number;
  TotalNeto: number;
  Cliente: IClient;

  InvoiceDetail: IInvoiceDetail[];
}

//-------------- Create ----------------------------------------------------

export type InvoiceLineaCreate = {
  ProductoId: number;
  Cantidad: number;
}

export type CreateInvoice = {
  Cliente: number;
  Lineas: InvoiceLineaCreate[]
  Comentario: string
}

//------------- Response ---------------------------------------------------


export type DetailResponse = {
  Id: number;
  ProductoId: number;
  ProductoNombre: number;
  Cantdad: number;
  PrecioUnitario: number;
  SubTotal: number;
}


export type InvoiceResponse = {
  Id: number;
  ClienteId: number;
  ClienteNombre: string
  Fecha: Date;
  TotalBruto: number;
  Impuesto: number;
  TotalNeto: number;
  Detalles: DetailResponse
}
