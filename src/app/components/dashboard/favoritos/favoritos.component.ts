import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="favoritos-widget">
      <h5 class="widget-title mb-3">
        <i class="fas fa-star me-2"></i>Favoritos
      </h5>
      <div class="favoritos-list">
        <div class="favorito-item" *ngFor="let favorito of favoritos">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>{{favorito.simbolo}}</strong>
              <small class="d-block text-muted">{{favorito.nombre}}</small>
            </div>
            <div class="text-end">
              <div class="precio">{{favorito.precio}}</div>
              <small [ngClass]="favorito.cambio >= 0 ? 'text-success' : 'text-danger'">
                {{favorito.cambio >= 0 ? '+' : ''}}{{favorito.cambio}}%
              </small>
            </div>
          </div>
        </div>
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
    
    .favorito-item {
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .favorito-item:last-child {
      border-bottom: none;
    }
    
    .precio {
      font-weight: bold;
      color: var(--text-color);
    }
  `]
})
export class FavoritosComponent {
  favoritos = [
    { simbolo: 'EURUSD', nombre: 'Euro / Dólar', precio: '1.0850', cambio: 0.25 },
    { simbolo: 'GBPUSD', nombre: 'Libra / Dólar', precio: '1.2650', cambio: -0.15 },
    { simbolo: 'USDJPY', nombre: 'Dólar / Yen', precio: '150.80', cambio: 0.40 },
    { simbolo: 'AUDUSD', nombre: 'Dólar Australiano', precio: '0.6750', cambio: -0.30 }
  ];
}
