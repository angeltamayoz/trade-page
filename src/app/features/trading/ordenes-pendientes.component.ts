import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordenes-pendientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordenes-pendientes.component.html',
  styleUrl: './ordenes-pendientes.component.scss'
})
export class OrdenesPendientesComponent {
  ordenes = [
    {
      id: 1,
      simbolo: 'EURUSD',
      tipo: 'Buy Limit',
      cantidad: 10000,
      precioEntrada: 1.0820,
      stopLoss: 1.0780,
      takeProfit: 1.0880,
      fecha: '2025-07-17 15:30',
      estado: 'Pendiente'
    },
    {
      id: 2,
      simbolo: 'GBPJPY',
      tipo: 'Sell Stop',
      cantidad: 5000,
      precioEntrada: 185.50,
      stopLoss: 186.20,
      takeProfit: 184.80,
      fecha: '2025-07-17 14:45',
      estado: 'Pendiente'
    },
    {
      id: 3,
      simbolo: 'USDJPY',
      tipo: 'Buy Stop',
      cantidad: 15000,
      precioEntrada: 150.80,
      stopLoss: 150.20,
      takeProfit: 151.50,
      fecha: '2025-07-17 13:20',
      estado: 'Pendiente'
    }
  ];

  cancelarOrden(id: number) {
    this.ordenes = this.ordenes.filter(orden => orden.id !== id);
  }
}
