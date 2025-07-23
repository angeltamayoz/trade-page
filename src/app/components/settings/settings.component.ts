import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  securityForm!: FormGroup;
  notificationForm!: FormGroup;
  tradingForm!: FormGroup;
  
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  activeTab = 'security'; // Tab activo por defecto
  
  // Estados de configuración
  settings = {
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      tradingAlerts: true,
      marketNews: false,
      accountUpdates: true
    },
    trading: {
      riskLevel: 'medium',
      autoStop: false,
      stopLossPercent: 10,
      takeProfitPercent: 20,
      maxDailyLoss: 500,
      defaultLeverage: 1
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: 30,
      loginNotifications: true
    }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  initializeForms(): void {
    this.securityForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.notificationForm = this.fb.group({
      emailAlerts: [this.settings.notifications.emailAlerts],
      smsAlerts: [this.settings.notifications.smsAlerts],
      pushNotifications: [this.settings.notifications.pushNotifications],
      tradingAlerts: [this.settings.notifications.tradingAlerts],
      marketNews: [this.settings.notifications.marketNews],
      accountUpdates: [this.settings.notifications.accountUpdates]
    });

    this.tradingForm = this.fb.group({
      riskLevel: [this.settings.trading.riskLevel],
      autoStop: [this.settings.trading.autoStop],
      stopLossPercent: [this.settings.trading.stopLossPercent, [Validators.min(1), Validators.max(50)]],
      takeProfitPercent: [this.settings.trading.takeProfitPercent, [Validators.min(1), Validators.max(100)]],
      maxDailyLoss: [this.settings.trading.maxDailyLoss, [Validators.min(10)]],
      defaultLeverage: [this.settings.trading.defaultLeverage, [Validators.min(1), Validators.max(100)]]
    });
  }

  loadSettings(): void {
    // En una implementación real, cargarías la configuración desde el servidor
    // this.authService.getUserSettings().subscribe(settings => { ... });
    
    // Por ahora, usar valores por defecto
    this.notificationForm.patchValue(this.settings.notifications);
    this.tradingForm.patchValue(this.settings.trading);
  }

  changePassword(): void {
    if (this.securityForm.valid) {
      const { newPassword, confirmPassword } = this.securityForm.value;
      
      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      // Simular cambio de contraseña
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = 'Contraseña actualizada correctamente';
        this.securityForm.reset();
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }, 1000);
    }
  }

  saveNotificationSettings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Simular guardado de configuración
    setTimeout(() => {
      this.isLoading = false;
      this.settings.notifications = this.notificationForm.value;
      this.successMessage = 'Configuración de notificaciones guardada';
      
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 500);
  }

  saveTradingSettings(): void {
    if (this.tradingForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      // Simular guardado de configuración
      setTimeout(() => {
        this.isLoading = false;
        this.settings.trading = this.tradingForm.value;
        this.successMessage = 'Configuración de trading guardada';
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }, 500);
    }
  }

  toggleTwoFactor(): void {
    this.settings.security.twoFactorEnabled = !this.settings.security.twoFactorEnabled;
    
    if (this.settings.security.twoFactorEnabled) {
      this.successMessage = 'Autenticación de dos factores habilitada';
    } else {
      this.successMessage = 'Autenticación de dos factores deshabilitada';
    }
    
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  exportData(): void {
    this.successMessage = 'Solicitud de exportación enviada. Recibirás un email con tus datos.';
    
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  deleteAccount(): void {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.errorMessage = 'Para eliminar tu cuenta, contacta con soporte.';
      
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    }
  }

  getErrorMessage(field: string, form: FormGroup): string {
    const control = form.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['minlength']) {
        return 'La contraseña debe tener al menos 8 caracteres';
      }
      if (control.errors['min']) {
        return `Valor mínimo: ${control.errors['min'].min}`;
      }
      if (control.errors['max']) {
        return `Valor máximo: ${control.errors['max'].max}`;
      }
    }
    return '';
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
