import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClientService } from '../../../Core/Service/Client/client.service';
import { IClient } from '../../../Core/Interface/Client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-detail',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './client-detail.component.html',
  styles: ``
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  client: IClient | null = null;
  loading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientsService: ClientService
  ) { }

  ngOnInit(): void {
    // obtenemos el id desde la ruta y pedimos al servicio
    const idStr = this.route.snapshot.paramMap.get('id');
    const id = idStr ? Number(idStr) : null;

    if (!id) {
      this.error = 'ID de cliente inválido.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.clientsService.getClientById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (c: any) => {
          this.client = c;
          this.loading = false;
          this.error = null;
        },
        error: (err: any) => {
          console.error('Error fetching client', err);
          this.error = 'No se pudo cargar el cliente.';
          this.loading = false;
        }
      });
  }

  goBack() {
    this.router.navigate(['/clientes']);
  }

  // Si quieres borrar: asumo que existe deleteClient(id: number)
  deleteClient() {
    if (!this.client) return;
    const confirmDelete = confirm(`¿Eliminar cliente "${this.client.nombre}"? Esta acción no se puede deshacer.`);
    if (!confirmDelete) return;

    this.loading = true;
    this.clientsService.deleteClient(this.client.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loading = false;
          // redirigir a la lista después de eliminar
          this.router.navigate(['/clientes']);
        },
        error: (err: any) => {
          console.error('Error deleting client', err);
          this.error = 'No se pudo eliminar el cliente.';
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
