import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FinanzasComponent } from './components/finanzas/finanzas.component';
import { OrdenesPendientesComponent } from './components/ordenes-pendientes/ordenes-pendientes.component';
import { AddFundsComponent } from './components/add-funds/add-funds.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard, NoAuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'finanzas', component: FinanzasComponent, canActivate: [AuthGuard] },
  { path: 'ordenes-pendientes', component: OrdenesPendientesComponent, canActivate: [AuthGuard] },
  { path: 'add-funds', component: AddFundsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];