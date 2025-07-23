import { Component, AfterViewInit } from '@angular/core';
import { CalendarioComponent } from './calendario/calendario.component';
import { TradingviewComponent } from './tradingview/tradingview.component';
import { CryptoComponent } from './crypto/crypto.component';
import { CommonModule } from '@angular/common';
import { ScreenerComponent } from "./screener/screener.component";
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PosicionesComponent } from './posiciones/posiciones.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CalendarioComponent,
    TradingviewComponent,
    CryptoComponent,
    ScreenerComponent,
    FavoritosComponent,
    PosicionesComponent,
    ScreenerComponent
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'FOREXCOM:EURUSD', title: 'EUR/USD' },
        { proName: 'FOREXCOM:GBPUSD', title: 'GBP/USD' },
        { proName: 'FOREXCOM:USDJPY', title: 'USD/JPY' },
        { proName: 'BINANCE:BTCUSDT', title: 'BTC/USDT' },
        { proName: 'BINANCE:ETHUSDT', title: 'ETH/USDT' },
        { proName: 'NASDAQ:AAPL', title: 'AAPL' },
        { proName: 'NASDAQ:TSLA', title: 'TSLA' },
        { proName: 'SP:SPX', title: 'S&P 500' },
        { proName: 'TVC:GOLD', title: 'Oro' },
        { proName: 'TVC:USOIL', title: 'Petróleo' }
      ],
      showSymbolLogo: true,
      colorTheme: 'dark',
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'es'
    });

    document.getElementById('ticker-tape')?.appendChild(script);
  }
}