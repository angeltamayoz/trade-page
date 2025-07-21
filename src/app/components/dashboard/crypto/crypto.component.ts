import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements AfterViewInit {
  @ViewChild('tradingviewContainer', { static: true }) containerRef!: ElementRef;

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "defaultColumn": "overview",
        "screener_type": "crypto_mkt",
        "displayCurrency": "USD",
        "colorTheme": "dark",
        "isTransparent": false,
        "locale": "en",
        "largeChartUrl": "",
        "width": "100%",
        "height": 550
      }
    `;
    this.containerRef.nativeElement.appendChild(script);
  }
}