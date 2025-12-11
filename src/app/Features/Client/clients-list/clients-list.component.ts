import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { IClient } from '../../../Core/Interface/Client.interface';
import { ClientService } from '../../../Core/Service/Client/client.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-clients-list',
  imports: [
    CommonModule,
    RouterLink
],
  templateUrl: './clients-list.component.html',
  styles: ``
})
export class ClientsListComponent implements OnDestroy, OnInit {
  // stream para el término de búsqueda
  private searchTerm$ = new BehaviorSubject<string>('');
  // observable final de clientes filtrados
  clients$!: Observable<IClient[]>;
  // control de carga / error
  loading = true;
  error: string | null = null;

  private subs = new Subscription();

  constructor(private clientsService: ClientService) { }

  ngOnInit(): void {
    const allClients$ = this.clientsService.getClients();

    // combineLatest para filtrar sobre la lista y el término (con debounce)
    this.clients$ = combineLatest([
      allClients$,
      this.searchTerm$.pipe(debounceTime(250))
    ]).pipe(
      map(([clients, term]) => {
        this.loading = false;
        this.error = null;
        const q = term?.trim().toLowerCase() || '';
        if (!q) return clients;
        return clients.filter((c: { nombre: any; }) => (c.nombre || '').toLowerCase().includes(q));
      })
    );

    // Manejo simple de errores y loading (si tu servicio maneja errores en el stream, adapta)
    const s = allClients$.subscribe({
      next: () => { /* todo ok; loading será false en map */ },
      error: (err: any) => {
        this.loading = false;
        this.error = 'No se pudieron cargar los clientes.';
        console.error('Clients load error', err);
      }
    });
    this.subs.add(s);
  }

  onSearch(term: string) {
    this.loading = true; // opcional: mostrar spinner mientras filtra
    this.searchTerm$.next(term);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
