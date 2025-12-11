import { IInvoice } from "./Invoice.interface";

export interface IClient {
  id: number;
  nombre: string;
  rucNit: string;
  direccion?: string | null;
  email?: string | null;
 facturas?: IInvoice[] | null;
}

export type CreateClient = Omit<IClient, 'id'>

export type UpdateClient = {
  Nombre?: string;
  RucNit?: string;
  Direccion?: string;
  Email?: string;
}
