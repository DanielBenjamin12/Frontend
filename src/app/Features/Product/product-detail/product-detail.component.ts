import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../Core/Service/Product/product.service';
import { IProduct } from '../../../Core/Interface/Product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styles: ``
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.error = null;

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
        this.error = 'No se pudo cargar el producto. Intenta nuevamente.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  deleteProduct(): void {
    if (!this.product) return;

    const confirmed = confirm(
      `¿Estás seguro de eliminar el producto "${this.product.nombre}"? Esta acción no se puede deshacer.`
    );

    if (confirmed) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => {
          alert('Producto eliminado correctamente');
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          alert('No se pudo eliminar el producto. Intenta nuevamente.');
        }
      });
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(price);
  }

  getStockStatus(stock: number): { text: string; class: string; icon: string } {
    if (stock === 0) {
      return {
        text: 'Agotado',
        class: 'bg-red-50 text-red-700 ring-red-600/20',
        icon: 'M6 18L18 6M6 6l12 12'
      };
    } else if (stock < 10) {
      return {
        text: 'Bajo stock',
        class: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      };
    } else {
      return {
        text: 'Disponible',
        class: 'bg-green-50 text-green-700 ring-green-600/20',
        icon: 'M5 13l4 4L19 7'
      };
    }
  }

  getTotalValue(): number {
    if (!this.product) return 0;
    return this.product.precioUnitario * this.product.stock;
  }
}
