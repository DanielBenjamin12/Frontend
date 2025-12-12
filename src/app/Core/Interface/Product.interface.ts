import { IInvoiceDetail } from "./InvoiceDetail.interface";

export interface IProduct {
  id: number;
  nombre: string;          // Nombre
  precioUnitario: number;  // PrecioUnitario
  stock: number;           // Stock
  detallesFactura?: IInvoiceDetail[]; // Navegación con DetallesFactura
}

export type CreateProduct = Omit<IProduct, "id">;

export type UpdateProduct = {
  nombre?: string;
  precioUnitario?: number;
  stock?: number;
};
