import { IInvoice } from "./Invoice.interface";

export interface IClient {
  id: number;
  nombre: string;       // Nombre
  rucNit: string;       // RucNit
  direccion?: string;   // Direccion
  email?: string;       // Email
  facturas?: IInvoice[]; // Navegación con Facturas
}

export type CreateClient = Omit<IClient, "id">;

export type UpdateClient = {
  nombre?: string;
  rucNit?: string;
  direccion?: string;
  email?: string;
};
