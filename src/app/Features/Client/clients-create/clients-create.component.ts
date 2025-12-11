import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../Core/Service/Client/client.service';

@Component({
  selector: 'app-clients-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './clients-create.component.html',
  styles: ``
})
export class ClientsCreateComponent {
  form: FormGroup;
  submitting = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      rucNit: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
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

    const payload = {
      nombre: this.f['nombre'].value,
      rucNit: this.f['rucNit'].value,
      direccion: this.f['direccion'].value,
      email: this.f['email'].value,
    };

    this.submitting = true;

    this.clientService.createClient(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = '¡Cliente creado correctamente!';
        setTimeout(() => this.router.navigate(['/clientes']), 1500);
      },
      error: (err: any) => {
        console.error('Error al crear cliente:', err);
        this.submitting = false;
        this.error = err?.error?.message || 'No se pudo crear el cliente. Verifica los datos e intenta nuevamente.';
      }
    });
  }

  onCancel() {
    this.router.navigate(['/clientes']);
  }
}
