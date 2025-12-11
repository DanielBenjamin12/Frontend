import { IInvoice } from "./Invoice.interface";

export interface IClient {
  Id: number;
  Nombre: string;
  RucNit: string;
  Direccion?: string;
  Email?: string;
}

export type CreateClient = Omit<IClient, 'Id'>
