import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  
  balance = 10001.00;
  capital = 10001.00;
  freeFunds = 10001.00;
  margin = 0.00;
  profit = 0.00;

  toggleSidebar() {
    this.sidebarToggle.emit();
  }
}