import { Component } from '@angular/core';

@Component({
  selector: 'app-tradingview',
  standalone: true,
  template: `
    <iframe
      src="https://s.tradingview.com/widgetembed/?symbol=FX:EURUSD&interval=60&theme=dark&style=1&toolbarbg=0e1621&studies=Accumulation%2FDistribution,Chaikin%20Money%20Flow,Ease%20of%20Movement,Elders%20Force%20Index,Klinger%20Oscillator,Chaikin%20Oscillator,Money%20Flow%20Index,Net%20Volume,On%20Balance%20Volume,Price%20Volume%20Trend,VWAP,Volume,Volume%20Oscillator,Volume%20Profile%20Visible%20Range,Volume%20Profile%20Fixed%20Range,VWMA&timezone=Etc%2FUTC&locale=en&hide_top_toolbar=false&hide_side_toolbar=false&save_image=true&enable_publishing=false&withdateranges=true"
      style="width: 100%; height: 500px; border: none;"
      frameborder="0"
      allowfullscreen>
    </iframe>
  `,
})
export class TradingviewComponent { }
