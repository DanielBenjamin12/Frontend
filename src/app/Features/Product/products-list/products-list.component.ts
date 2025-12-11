import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../Core/Service/Product/product.service';
import { IProduct } from '../../../Core/Interface/Product.interface';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products-list.component.html',
  styles: ``
})
export class ProductsListComponent implements OnInit {
  products$!: Observable<IProduct[]>;
  private allProducts$ = new BehaviorSubject<IProduct[]>([]);
  private searchTerm$ = new BehaviorSubject<string>('');

  loading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {
    // Combinar productos con término de búsqueda
    this.products$ = combineLatest([
      this.allProducts$,
      this.searchTerm$
    ]).pipe(
      map(([products, searchTerm]) => {
        if (!searchTerm.trim()) {
          return products;
        }
        const term = searchTerm.toLowerCase();
        return products.filter(product =>
          product.nombre.toLowerCase().includes(term)
        );
      })
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getAllProduct().subscribe({
      next: (products) => {
        this.allProducts$.next(products);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'No se pudieron cargar los productos. Intenta nuevamente.';
        this.loading = false;
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm$.next(term);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(price);
  }

  getStockStatus(stock: number): { text: string; class: string } {
    if (stock === 0) {
      return { text: 'Agotado', class: 'bg-red-50 text-red-700 ring-red-600/20' };
    } else if (stock < 10) {
      return { text: 'Bajo stock', class: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' };
    } else {
      return { text: 'Disponible', class: 'bg-green-50 text-green-700 ring-green-600/20' };
    }
  }
}
