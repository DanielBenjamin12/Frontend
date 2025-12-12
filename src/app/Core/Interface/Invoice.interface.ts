import { IClient } from "./Client.interface";
import { IInvoiceDetail } from "./InvoiceDetail.interface";

export interface IInvoice {
  id: number;
  clienteId: number;       // ClienteId
  fecha: string;             // Fecha
  totalBruto: number;      // TotalBruto
  impuestos: number;       // Impuestos
  totalNeto: number;       // TotalNeto

  cliente?: IClient;       // Navegación con Cliente
  detalles?: IInvoiceDetail[]; // Navegación con Detalles
}

//-------------- Create ----------------------------------------------------

export type InvoiceLineaCreate = {
  productoId: number;   // ProductoId
  cantidad: number;     // Cantidad
}

export type CreateInvoice = {
  clienteId: number;                // ClienteId
  lineas: InvoiceLineaCreate[];  // Lineas
  comentarios?: string;
}

//------------- Response ---------------------------------------------------


export type DetailResponse = {
  id: number;               // Id
  productoId: number;       // ProductoId
  productoNombre?: string;  // ProductoNombre (nullable)
  cantidad: number;         // Cantidad
  precioUnitario: number;   // PrecioUnitario
  subtotal: number;
}


export type InvoiceResponse = {
  id: number;                     // Id
  clienteId: number;              // ClienteId
  clienteNombre?: string;         // ClienteNombre (nullable)
  fecha: string;                    // Fecha
  totalBruto: number;             // TotalBruto
  impuestos: number;              // Impuestos
  totalNeto: number;              // TotalNeto
  detalles: DetailResponse[];
}
