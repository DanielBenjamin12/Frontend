import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../Core/Service/Invoice/invoice.service';
import { InvoiceResponse } from '../../../Core/Interface/Invoice.interface';



@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-list.component.html',
  styles: ``
})
export class InvoiceListComponent implements OnInit {
  facturas: InvoiceResponse[] = [];
  filteredFacturas: InvoiceResponse[] = [];
  loading = true;
  error: string | null = null;

  // Filters
  searchTerm: string = '';
  selectedMonth: string = '';
  sortBy: 'date' | 'total' | 'client' = 'date';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.loading = true;
    this.error = null;

    this.invoiceService.getAllInvoice().subscribe({
      next: (data) => {
        this.facturas = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las facturas';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.facturas];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(f =>
        f.clienteNombre?.toLowerCase().includes(term) ||
        f.id.toString().includes(term)
      );
    }

    // Month filter
    if (this.selectedMonth) {
      filtered = filtered.filter(f => {
        const date = new Date(f.fecha);
        const month = date.toISOString().substring(0, 7);
        return month === this.selectedMonth;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch(this.sortBy) {
        case 'date':
          comparison = new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
          break;
        case 'total':
          comparison = a.totalNeto - b.totalNeto;
          break;
        case 'client':
          comparison = (a.clienteNombre || '').localeCompare(b.clienteNombre || '');
          break;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });

    this.filteredFacturas = filtered;
  }

  get totalRevenue(): number {
    return this.facturas.reduce((sum, f) => sum + f.totalNeto, 0);
  }

  get totalInvoices(): number {
    return this.facturas.length;
  }

  get averageInvoice(): number {
    return this.facturas.length > 0 ? this.totalRevenue / this.facturas.length : 0;
  }

  get totalTaxes(): number {
    return this.facturas.reduce((sum, f) => sum + f.impuestos, 0);
  }

  get availableMonths(): string[] {
    const months = new Set<string>();
    this.facturas.forEach(f => {
      const date = new Date(f.fecha);
      months.add(date.toISOString().substring(0, 7));
    });
    return Array.from(months).sort().reverse();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onMonthChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedMonth = '';
    this.sortBy = 'date';
    this.sortOrder = 'desc';
    this.applyFilters();
  }

  goToCreateInvoice(): void {
    this.router.navigate(['/facturas/nuevo']);
  }

  viewInvoice(id: number): void {
    this.router.navigate(['/facturas', id]);
  }

  deleteInvoice(event: Event, id: number, clienteName: string): void {
    event.stopPropagation();
    if (confirm(`¿Estás seguro de eliminar la factura #${id} de ${clienteName}?`)) {
      this.invoiceService.deleteInvoiceById(id).subscribe({
        next: () => {
          this.facturas = this.facturas.filter(f => f.id !== id);
          this.applyFilters();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar la factura');
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(amount);
  }

  getMonthName(monthString: string): string {
    const [year, month] = monthString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  }
}
