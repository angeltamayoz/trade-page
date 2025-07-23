import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posiciones',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="posiciones-widget">
      <h5 class="widget-title mb-3">
        <i class="fas fa-chart-pie me-2"></i>Posiciones Abiertas
      </h5>
      <div class="posiciones-list" *ngIf="posiciones.length > 0">
        <div class="posicion-item" *ngFor="let posicion of posiciones">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>{{posicion.simbolo}}</strong>
              <span class="badge ms-2" [ngClass]="posicion.tipo === 'Buy' ? 'bg-success' : 'bg-danger'">
                {{posicion.tipo}}
              </span>
            </div>
            <div class="text-end">
              <div [ngClass]="posicion.pl >= 0 ? 'text-success' : 'text-danger'">
                {{posicion.pl >= 0 ? '+' : ''}}{{posicion.pl}}€
              </div>
            </div>
          </div>
          <div class="posicion-details small text-muted">
            <div>Volumen: {{posicion.volumen}}</div>
            <div>Precio: {{posicion.precio}}</div>
          </div>
        </div>
      </div>
      <div *ngIf="posiciones.length === 0" class="text-center py-3">
        <i class="fas fa-chart-pie fa-2x text-muted mb-2"></i>
        <div class="text-muted">No hay posiciones abiertas</div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: var(--card-color);
      border-radius: 10px;
      padding: 1rem;
      color: var(--text-color);
      border: 1px solid var(--border-color);
    }
    
    .widget-title {
      color: var(--text-color);
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.5rem;
    }
    
    .posicion-item {
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .posicion-item:last-child {
      border-bottom: none;
    }
    
    .badge {
      font-size: 0.7rem;
    }
  `]
})
export class PosicionesComponent {
  posiciones = [
    { simbolo: 'EURUSD', tipo: 'Buy', volumen: 10000, precio: '1.0845', pl: 125.50 },
    { simbolo: 'GBPUSD', tipo: 'Sell', volumen: 5000, precio: '1.2655', pl: -75.25 },
    { simbolo: 'USDJPY', tipo: 'Buy', volumen: 15000, precio: '150.75', pl: 200.80 }
  ];
}
