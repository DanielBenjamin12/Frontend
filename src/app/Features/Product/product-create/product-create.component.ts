import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../Core/Service/Product/product.service';
import { CreateProduct } from '../../../Core/Interface/Product.interface';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styles: ``
})
export class ProductCreateComponent {
  form: FormGroup;
  submitting = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precioUnitario: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+$/)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.error = null;
    this.successMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: CreateProduct = {
      nombre: this.f['nombre'].value.trim(),
      precioUnitario: parseFloat(this.f['precioUnitario'].value),
      stock: parseInt(this.f['stock'].value, 10)
    };

    this.submitting = true;

    this.productService.createProduct(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = '¡Producto creado correctamente!';
        setTimeout(() => this.router.navigate(['/productos']), 1500);
      },
      error: (err: any) => {
        console.error('Error al crear producto:', err);
        this.submitting = false;
        this.error = err?.error?.message || 'No se pudo crear el producto. Verifica los datos e intenta nuevamente.';
      }
    });
  }

  onCancel() {
    this.router.navigate(['/productos']);
  }

  formatPrice(value: string): string {
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(num);
  }

  getStockLevel(): { text: string; class: string } {
    const stock = parseInt(this.f['stock'].value, 10);
    if (isNaN(stock)) return { text: '', class: '' };

    if (stock === 0) {
      return { text: 'Sin stock', class: 'text-red-600' };
    } else if (stock < 10) {
      return { text: 'Stock bajo', class: 'text-yellow-600' };
    } else {
      return { text: 'Stock disponible', class: 'text-green-600' };
    }
  }
}
