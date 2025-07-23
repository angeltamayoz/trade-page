import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarOpen = false;
  isLandingPage = false;
  isLoginPage = false;
  isRegisterPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes to detect current page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLandingPage = event.url === '/' || event.url === '';
        this.isLoginPage = event.url === '/login';
        this.isRegisterPage = event.url === '/register';
      });

    // Set initial state
    this.isLandingPage = this.router.url === '/' || this.router.url === '';
    this.isLoginPage = this.router.url === '/login';
    this.isRegisterPage = this.router.url === '/register';
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Helper method to check if we should show navigation
  shouldShowNavigation(): boolean {
    return !this.isLandingPage && !this.isLoginPage && !this.isRegisterPage;
  }
}
