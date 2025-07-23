import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  standalone: true,
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements AfterViewInit {
  currentTab = 'calendar';

  ngAfterViewInit() {
    this.loadWidget(this.currentTab);
  }

  changeTab(tab: string) {
    this.currentTab = tab;
    this.loadWidget(tab);
  }

  loadWidget(tab: string) {
    const container = document.getElementById('widget-container');
    if (container) container.innerHTML = '';

    const script = document.createElement('script');
    script.async = true;

    switch (tab) {
      case 'calendar':
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
        script.innerHTML = JSON.stringify({
          colorTheme: 'dark',
          isTransparent: false,
          width: '100%',
          height: 350,
          locale: 'es',
          importanceFilter: '-1,0,1',
          currencyFilter: 'USD,EUR,JPY,GBP,AUD,CAD,CHF,CNY',
        });
        break;

      case 'news':
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
        script.innerHTML = JSON.stringify({
          feedMode: 'market',
          colorTheme: 'dark',
          isTransparent: false,
          width: '100%',
          height: 400,
          locale: 'es',
        });
        break;

      case 'forex':
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
        script.innerHTML = JSON.stringify({
          width: '100%',
          height: 400,
          colorTheme: 'dark',
          currencies: ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD'],
          isTransparent: false,
          locale: 'es',
        });
        break;
    }

    container?.appendChild(script);
  }
}