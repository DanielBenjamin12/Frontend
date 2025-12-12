import { IProduct } from "./Product.interface";
import { IInvoice } from "./Invoice.interface";

export interface IInvoiceDetail {
  id: number;
  facturaId: number;       // FacturaId
  productoId: number;      // ProductoId
  cantidad: number;        // Cantidad
  precioUnitario: number;  // PrecioUnitario
  subtotal: number;        // Subtotal

  factura?: IInvoice;      // Navegación con Factura
  producto?: IProduct;     // Navegación con Producto
}
