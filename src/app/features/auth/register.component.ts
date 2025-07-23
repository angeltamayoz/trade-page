import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../core/services/auth.service';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email], [this.emailExistsValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    if (!valid) {
      return { 'passwordStrength': true };
    }
    return null;
  }

  passwordMatchValidator(form: AbstractControl): { [key: string]: any } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (!control.value || !control.value.includes('@')) {
        return of(null);
      }

      return of(control.value).pipe(
        debounceTime(500),
        switchMap(email => 
          this.authService.checkEmailExists(email).pipe(
            map(result => result.exists ? { 'emailExists': true } : null),
            catchError(() => of(null))
          )
        )
      );
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const registerData: RegisterRequest = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phone: this.registerForm.value.phone,
        acceptTerms: this.registerForm.value.acceptTerms
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = '¡Registro exitoso! Redirigiendo al login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.errorMessage = response.message || 'Error en el registro';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Error de conexión. Inténtalo de nuevo.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldName(field)} es requerido`;
      }
      if (control.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (control.errors['emailExists']) {
        return 'Este email ya está registrado';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `${this.getFieldName(field)} debe tener al menos ${requiredLength} caracteres`;
      }
      if (control.errors['passwordStrength']) {
        return 'La contraseña debe tener al menos: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial';
      }
      if (control.errors['pattern']) {
        return 'Ingresa un número de teléfono válido';
      }
      if (control.errors['requiredTrue']) {
        return 'Debes aceptar los términos y condiciones';
      }
    }

    if (field === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch'] && control?.touched) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }

  private getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      firstName: 'El nombre',
      lastName: 'El apellido',
      email: 'El email',
      password: 'La contraseña',
      confirmPassword: 'La confirmación de contraseña',
      phone: 'El teléfono',
      acceptTerms: 'Los términos y condiciones'
    };
    return fieldNames[field] || field;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
