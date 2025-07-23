import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  isEditing = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      dateOfBirth: [''],
      address: [''],
      city: [''],
      country: [''],
      zipCode: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.profileForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
        phone: this.currentUser.phone || '',
        dateOfBirth: this.currentUser.dateOfBirth || '',
        address: this.currentUser.address || '',
        city: this.currentUser.city || '',
        country: this.currentUser.country || '',
        zipCode: this.currentUser.zipCode || ''
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.loadUserProfile(); // Restaurar valores originales si se cancela
      this.successMessage = '';
      this.errorMessage = '';
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Simular actualización del perfil
      setTimeout(() => {
        this.isLoading = false;
        this.isEditing = false;
        this.successMessage = 'Perfil actualizado correctamente';
        
        // En una implementación real, aquí harías la llamada al servicio para actualizar el perfil
        // this.authService.updateProfile(this.profileForm.value).subscribe(...)
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(field: string): string {
    const control = this.profileForm.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldName(field)} es requerido`;
      }
      if (control.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `${this.getFieldName(field)} debe tener al menos ${requiredLength} caracteres`;
      }
      if (control.errors['pattern']) {
        return 'Ingresa un número de teléfono válido';
      }
    }
    return '';
  }

  private getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      firstName: 'El nombre',
      lastName: 'El apellido',
      email: 'El email',
      phone: 'El teléfono',
      dateOfBirth: 'La fecha de nacimiento',
      address: 'La dirección',
      city: 'La ciudad',
      country: 'El país',
      zipCode: 'El código postal'
    };
    return fieldNames[field] || field;
  }

  getUserInitials(): string {
    if (this.currentUser) {
      return `${this.currentUser.firstName.charAt(0)}${this.currentUser.lastName.charAt(0)}`.toUpperCase();
    }
    return 'U';
  }
}
