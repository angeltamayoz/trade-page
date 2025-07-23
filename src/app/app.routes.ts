import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FinanzasComponent } from './features/trading/finanzas.component';
import { OrdenesPendientesComponent } from './features/trading/ordenes-pendientes.component';
import { AddFundsComponent } from './features/trading/add-funds.component';
import { ProfileComponent } from './features/user/profile.component';
import { SettingsComponent } from './features/user/settings.component';
import { AuthGuard, NoAuthGuard } from './core/guards/auth.guard';

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