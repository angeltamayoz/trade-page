import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      // Simular autenticación
      setTimeout(() => {
        const { email, password } = this.loginForm.value;
        
        // Simulación de validación simple
        if (email === 'admin@tradeeu.com' && password === '123456') {
          // Login exitoso
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        } else {
          // Login fallido
          this.isLoading = false;
          this.errorMessage = 'Credenciales incorrectas. Intenta con: admin@tradeeu.com / 123456';
        }
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldName(field)} es requerido`;
      }
      if (control.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (control.errors['minlength']) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
    }
    return '';
  }

  private getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      email: 'El email',
      password: 'La contraseña'
    };
    return fieldNames[field] || field;
  }

  goToRegister(): void {
    // Por ahora redirige al dashboard, puedes crear un componente de registro después
    this.router.navigate(['/dashboard']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
