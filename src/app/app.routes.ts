import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FinanzasComponent } from './components/finanzas/finanzas.component';
import { OrdenesPendientesComponent } from './components/ordenes-pendientes/ordenes-pendientes.component';
import { AddFundsComponent } from './components/add-funds/add-funds.component';

export const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'finanzas', component: FinanzasComponent },
  { path: 'ordenes-pendientes', component: OrdenesPendientesComponent },
  { path: 'add-funds', component: AddFundsComponent }
];