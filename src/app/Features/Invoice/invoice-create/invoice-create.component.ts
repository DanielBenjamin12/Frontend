import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../Core/Service/Invoice/invoice.service';
import { ProductService } from '../../../Core/Service/Product/product.service';
import { ClientService } from '../../../Core/Service/Client/client.service';
import { IClient } from '../../../Core/Interface/Client.interface';
import { IProduct } from '../../../Core/Interface/Product.interface';
import { CreateInvoice, InvoiceLineaCreate } from '../../../Core/Interface/Invoice.interface';

interface InvoiceItem {
  producto: IProduct;
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-create.component.html',
  styles: ``
})
export class InvoiceCreateComponent implements OnInit {
  // Data from backend
  clientes: IClient[] = [];
  productos: IProduct[] = [];

  // Form data
  selectedClienteId: number | null = null;
  selectedProductoId: number | null = null;
  cantidad: number = 1;
  comentarios: string = '';

  // Invoice items
  items: InvoiceItem[] = [];

  // UI states
  loading = false;
  loadingData = true;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.loadingData = true;

    Promise.all([
      this.clientService.getClients().toPromise(),
      this.productService.getAllProducts().toPromise()
    ])
    .then(([clientes, productos]) => {
      this.clientes = clientes || [];
      this.productos = productos || [];
      this.loadingData = false;
    })
    .catch(err => {
      this.error = 'Error al cargar datos iniciales';
      this.loadingData = false;
      console.error('Error:', err);
    });
  }

  get selectedProduct(): IProduct | undefined {
    return this.productos.find(p => p.id === this.selectedProductoId);
  }

  get totalBruto(): number {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  get impuestos(): number {
    return this.totalBruto * 0.13; // 13% ITBIS
  }

  get totalNeto(): number {
    return this.totalBruto + this.impuestos;
  }

  addProduct(): void {
    if (!this.selectedProductoId || this.cantidad <= 0) {
      alert('Por favor selecciona un producto y una cantidad válida');
      return;
    }

    const producto = this.selectedProduct;
    if (!producto) return;

    if (this.cantidad > producto.stock) {
      alert(`Stock insuficiente. Disponible: ${producto.stock}`);
      return;
    }

    // Check if product already exists
    const existingItem = this.items.find(item => item.producto.id === producto.id);

    if (existingItem) {
      const newCantidad = existingItem.cantidad + this.cantidad;
      if (newCantidad > producto.stock) {
        alert(`Stock insuficiente. Disponible: ${producto.stock}`);
        return;
      }
      existingItem.cantidad = newCantidad;
      existingItem.subtotal = existingItem.cantidad * producto.precioUnitario;
    } else {
      this.items.push({
        producto: producto,
        cantidad: this.cantidad,
        subtotal: this.cantidad * producto.precioUnitario
      });
    }

    // Reset selection
    this.selectedProductoId = null;
    this.cantidad = 1;
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  updateQuantity(index: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeItem(index);
      return;
    }

    const item = this.items[index];
    if (newQuantity > item.producto.stock) {
      alert(`Stock insuficiente. Disponible: ${item.producto.stock}`);
      return;
    }

    item.cantidad = newQuantity;
    item.subtotal = item.cantidad * item.producto.precioUnitario;
  }

  createInvoice(): void {
    if (!this.selectedClienteId) {
      alert('Por favor selecciona un cliente');
      return;
    }

    if (this.items.length === 0) {
      alert('Agrega al menos un producto a la factura');
      return;
    }

    const lineas: InvoiceLineaCreate[] = this.items.map(item => ({
      productoId: item.producto.id,
      cantidad: item.cantidad
    }));

    const payload: CreateInvoice = {
      clienteId: this.selectedClienteId,
      lineas: lineas,
      comentarios: this.comentarios || undefined
    };

    this.loading = true;
    this.error = null;

    this.invoiceService.createInvoice(payload).subscribe({
      next: (response) => {
        this.successMessage = `Factura #${response.id} creada exitosamente`;
        setTimeout(() => {
          this.router.navigate(['/facturas']);
        }, 1500);
      },
      error: (err) => {
        this.error = 'Error al crear la factura';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/facturas']);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(amount);
  }
}
