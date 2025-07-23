import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var Swiper: any;

interface TickerItem {
  label: string;
  symbol: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit, OnDestroy, AfterViewInit {
  
  tickerData: TickerItem[] = [];
  private tickerInterval: any;
  
  contactForm = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  isMobileMenuOpen = false;

  heroSlides = [
    {
      image: '/slide1.webp',
      title: 'Tomando el Trading con Dedicación, como Tú',
      subtitle: 'Únete a TradeEU Global y explora los mercados con confianza.',
      buttonText: 'Comienza a Operar Ahora',
      buttonLink: '/register'
    },
    {
      image: '/slide2.webp',
      title: 'Broker Regulado por la FSC',
      subtitle: 'Confianza y seguridad como base de nuestras operaciones.',
      buttonText: 'Nuestra Regulación',
      buttonLink: '#regulacion'
    },
    {
      image: '/slide3.webp',
      title: 'Comisiones de Trading Cero',
      subtitle: 'Sin tarifas adicionales al operar. Transparencia total.',
      buttonText: 'Comienza a Operar Ahora',
      buttonLink: '/register'
    }
  ];

  accountTypes = [
    {
      name: 'PLATA',
      image: '/silver.png',
      description: 'Nuestra cuenta Plata te espera para abrirte la puerta del mundo del mercado financiero.',
      colorClass: 'text-gray-700'
    },
    {
      name: 'ORO',
      image: '/gold.png',
      description: 'Empieza a volar con la cuenta oro, donde las oportunidades alcanzan nuevas alturas.',
      colorClass: 'text-yellow-600'
    },
    {
      name: 'PLATINO',
      image: '/platinum.png',
      description: 'Forma parte de la cúspide de inversores de elite, recibe nuestras exclusivas ofertas de trading.',
      colorClass: 'text-gray-900'
    },
    {
      name: 'ISLÁMICA',
      image: '/islam.png',
      description: 'Nuestra cuenta Islámica abre puertas para los traders.',
      colorClass: 'text-green-600'
    }
  ];

  benefits = [
    {
      title: 'Regulación Europea',
      description: 'Opera con seguridad bajo normas estrictas.'
    },
    {
      title: 'Sin comisiones ocultas',
      description: 'Transparencia total en cada operación.'
    },
    {
      title: 'Tecnología avanzada',
      description: 'Accede a herramientas rápidas y potentes.'
    },
    {
      title: 'Soporte dedicado',
      description: 'Asistencia en tu idioma cuando lo necesites.'
    }
  ];

  ngOnInit() {
    this.initializeTicker();
    this.loadSwiperLibrary();
  }

  ngAfterViewInit() {
    // Initialize Swiper after view is ready
    setTimeout(() => {
      this.initializeSwiper();
    }, 100);
  }

  ngOnDestroy() {
    if (this.tickerInterval) {
      clearInterval(this.tickerInterval);
    }
  }

  private loadSwiperLibrary() {
    // Load Swiper CSS
    if (!document.querySelector('link[href*="swiper-bundle.min.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/swiper/swiper-bundle.min.css';
      document.head.appendChild(link);
    }

    // Load Swiper JS
    if (!document.querySelector('script[src*="swiper-bundle.min.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
      script.onload = () => {
        setTimeout(() => this.initializeSwiper(), 100);
      };
      document.head.appendChild(script);
    }
  }

  private initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
      // Hero slider
      new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        effect: 'slide'
      });

      // Accounts slider
      new Swiper('.cuentas-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.cuentas-swiper .swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }
      });
    }
  }

  private async initializeTicker() {
    try {
      await this.fetchTickerData();
      // Update every 60 seconds
      this.tickerInterval = setInterval(() => {
        this.fetchTickerData();
      }, 60000);
    } catch (error) {
      console.error('Error initializing ticker:', error);
      this.setDefaultTickerData();
    }
  }

  private async fetchTickerData() {
    try {
      // Using a demo API endpoint - replace with your actual API
      const symbols = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'BTC/USD', 'ETH/USD'];
      
      // Simulate API data for demo purposes
      this.tickerData = symbols.map(symbol => ({
        label: symbol,
        symbol: symbol,
        price: Math.random() * 2000 + 1000,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 5
      }));
    } catch (error) {
      console.error('Error fetching ticker data:', error);
      this.setDefaultTickerData();
    }
  }

  private setDefaultTickerData() {
    this.tickerData = [
      { label: 'EUR/USD', symbol: 'EURUSD', price: 1.0847, change: 0.0012, changePercent: 0.11 },
      { label: 'GBP/USD', symbol: 'GBPUSD', price: 1.2654, change: -0.0023, changePercent: -0.18 },
      { label: 'USD/JPY', symbol: 'USDJPY', price: 149.87, change: 0.45, changePercent: 0.30 },
      { label: 'AUD/USD', symbol: 'AUDUSD', price: 0.6789, change: 0.0034, changePercent: 0.50 },
      { label: 'BTC/USD', symbol: 'BTCUSD', price: 43250.67, change: 1250.34, changePercent: 2.98 },
      { label: 'ETH/USD', symbol: 'ETHUSD', price: 2567.89, change: -67.23, changePercent: -2.55 }
    ];
  }

  getPriceChangeClass(change: number): string {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-yellow-400';
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onSubmitContact() {
    // Handle contact form submission
    console.log('Contact form submitted:', this.contactForm);
    
    // Reset form
    this.contactForm = {
      nombre: '',
      email: '',
      mensaje: ''
    };
    
    // Show success message (you can implement a proper notification system)
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }
}
