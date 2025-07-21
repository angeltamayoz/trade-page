import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.scss']
})
export class ScreenerComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = `
    {
      "width": "100%",
      "height": "500",
      "defaultColumn": "overview",
      "defaultScreen": "crypto",
      "market": "crypto",
      "colorTheme": "dark",
      "locale": "en",
      "backgroundColor": "#0e1621"
    }`;
    document.getElementById('tradingview-widget')?.appendChild(script);
  }
}
