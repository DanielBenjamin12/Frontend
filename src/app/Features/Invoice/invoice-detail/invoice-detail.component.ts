import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../Core/Service/Invoice/invoice.service';
import { InvoiceResponse } from '../../../Core/Interface/Invoice.interface';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styles: `
    @media print {
    .print\\:hidden {
      display: none !important;
    }

    body {
      background: white;
    }

    .bg-gray-50 {
      background: white;
    }
  }
  `
})
export class InvoiceDetailComponent implements OnInit {
  factura: InvoiceResponse | null = null;
  loading = true;
  error: string | null = null;
  invoiceId: number | null = null;

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.invoiceId = +params['id'];
      if (this.invoiceId) {
        this.loadInvoiceDetails();
      }
    });
  }

  loadInvoiceDetails(): void {
    if (!this.invoiceId) return;

    this.loading = true;
    this.error = null;

    this.invoiceService.getInvoiceById(this.invoiceId).subscribe({
      next: (data: any) => {
        // Convert IInvoice to InvoiceResponse format if needed
        if (data.detalles && !data.detalles[0]?.productoNombre) {
          // If data is in IInvoice format, we need to map it
          this.factura = {
            id: data.id,
            clienteId: data.clienteId,
            clienteNombre: data.cliente?.nombre,
            fecha: data.fecha,
            totalBruto: data.totalBruto,
            impuestos: data.impuestos,
            totalNeto: data.totalNeto,
            detalles: data.detalles?.map((d: any) => ({
              id: d.id,
              productoId: d.productoId,
              productoNombre: d.producto?.nombre,
              cantidad: d.cantidad,
              precioUnitario: d.precioUnitario,
              subtotal: d.subtotal
            })) || []
          };
        } else {
          this.factura = data;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los detalles de la factura';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  deleteInvoice(): void {
    if (!this.factura) return;

    const confirmMsg = `¿Estás seguro de eliminar la factura #${this.factura.id} de ${this.factura.clienteNombre}?`;
    if (confirm(confirmMsg)) {
      this.invoiceService.deleteInvoiceById(this.factura.id).subscribe({
        next: () => {
          this.router.navigate(['/facturas']);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar la factura');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/facturas']);
  }

  printInvoice(): void {
    window.print();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  get totalUnidades(): number {
    if (!this.factura) return 0;
    return this.factura.detalles.reduce((sum, d) => sum + d.cantidad, 0);
  }

  get promedioProducto(): number {
    if (!this.factura || this.factura.detalles.length === 0) return 0;
    return this.factura.totalBruto / this.factura.detalles.length;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(amount);
  }
}
