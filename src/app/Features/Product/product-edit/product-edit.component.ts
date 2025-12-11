import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, UpdateProduct } from '../../../Core/Interface/Product.interface';
import { ProductService } from '../../../Core/Service/Product/product.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styles: ``
})
export class ProductEditComponent implements OnInit {
  form!: FormGroup;
  productId: number = 0;
  submitting = false;
  loading = true;
  error: string | null = null;
  successMessage: string | null = null;
  originalProduct: IProduct | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // Obtener el ID del producto desde la ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? parseInt(idParam, 10) : 0;

    if (this.productId && !isNaN(this.productId)) {
      this.loadProduct();
    } else {
      this.error = 'ID de producto no válido';
      this.loading = false;
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precioUnitario: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]]
    });
  }

  private loadProduct(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProductById(this.productId).subscribe({
      next: (product: IProduct) => {
        this.originalProduct = product;
        this.form.patchValue({
          nombre: product.nombre,
          precioUnitario: product.precioUnitario,
          stock: product.stock
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.error = err.error?.message || 'Error al cargar el producto. Por favor, intenta nuevamente.';
        this.loading = false;
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  formatPrice(value: string): string {
    const num = parseFloat(value);
    if (isNaN(num)) return 'DOP $0.00';
    return `DOP $${num.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  getStockLevel(): { text: string; class: string } {
    const stock = this.f['stock'].value;
    if (stock === 0) {
      return { text: '⚠️ Sin stock disponible', class: 'text-red-600' };
    } else if (stock <= 10) {
      return { text: '⚠️ Stock bajo', class: 'text-orange-600' };
    } else if (stock <= 50) {
      return { text: '✓ Stock moderado', class: 'text-blue-600' };
    } else {
      return { text: '✓ Stock alto', class: 'text-green-600' };
    }
  }

  hasChanges(): boolean {
    if (!this.originalProduct) return false;

    const formValue = this.form.value;
    return (
      formValue.nombre !== this.originalProduct.nombre ||
      parseFloat(formValue.precioUnitario) !== this.originalProduct.precioUnitario ||
      parseInt(formValue.stock, 10) !== this.originalProduct.stock
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched();
      });
      return;
    }

    if (!this.hasChanges()) {
      this.error = 'No se han realizado cambios en el producto';
      return;
    }

    this.submitting = true;
    this.error = null;
    this.successMessage = null;

    // Crear el payload solo con los campos que cambiaron
    const payload: UpdateProduct = {};

    if (this.form.value.nombre.trim() !== this.originalProduct?.nombre) {
      payload.nombre = this.form.value.nombre.trim();
    }

    const newPrice = parseFloat(this.form.value.precioUnitario);
    if (newPrice !== this.originalProduct?.precioUnitario) {
      payload.precioUnitario = newPrice;
    }

    const newStock = parseInt(this.form.value.stock, 10);
    if (newStock !== this.originalProduct?.stock) {
      payload.stock = newStock;
    }

    this.productService.updateProduct(this.productId.toString(), payload).subscribe({
      next: (response: IProduct) => {
        this.successMessage = 'Producto actualizado exitosamente';
        this.submitting = false;
        this.originalProduct = response; // Actualizar el producto original

        // Redirigir después de 1.5 segundos
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
        this.error = err.error?.message || 'Error al actualizar el producto. Por favor, intenta nuevamente.';
        this.submitting = false;
      }
    });
  }

  onCancel(): void {
    if (this.hasChanges() && !this.submitting) {
      const confirmLeave = confirm('Tienes cambios sin guardar. ¿Estás seguro de que deseas salir?');
      if (!confirmLeave) {
        return;
      }
    }
    this.router.navigate(['/products']);
  }

  onReset(): void {
    if (this.originalProduct) {
      this.form.patchValue({
        nombre: this.originalProduct.nombre,
        precioUnitario: this.originalProduct.precioUnitario,
        stock: this.originalProduct.stock
      });
      this.error = null;
      this.successMessage = null;
    }
  }
}
