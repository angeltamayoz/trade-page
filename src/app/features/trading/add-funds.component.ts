import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-funds',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-funds.component.html',
  styleUrl: './add-funds.component.scss'
})
export class AddFundsComponent {
  paymentForm: FormGroup;
  selectedAmount = 1000;
  selectedMethod = 'card';
  isProcessing = false;
  showConfirmation = false;
  
  predefinedAmounts = [100, 500, 1000, 2500, 5000, 10000];
  
  paymentMethods = [
    { id: 'card', name: 'Tarjeta de Crédito/Débito', icon: 'fas fa-credit-card', fee: '2.9%' },
    { id: 'transfer', name: 'Transferencia Bancaria', icon: 'fas fa-university', fee: 'Gratis' },
    { id: 'paypal', name: 'PayPal', icon: 'fab fa-paypal', fee: '3.4%' },
    { id: 'crypto', name: 'Criptomonedas', icon: 'fab fa-bitcoin', fee: '1.5%' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.paymentForm = this.fb.group({
      amount: [this.selectedAmount, [Validators.required, Validators.min(10), Validators.max(50000)]],
      paymentMethod: [this.selectedMethod, Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardName: ['', Validators.required],
      email: ['user@example.com', [Validators.required, Validators.email]],
      acceptTerms: [false, Validators.requiredTrue]
    });

    // Update validators based on payment method
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.updateValidators(method);
    });
  }

  updateValidators(method: string) {
    const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
    
    if (method === 'card') {
      cardFields.forEach(field => {
        this.paymentForm.get(field)?.enable();
      });
    } else {
      cardFields.forEach(field => {
        this.paymentForm.get(field)?.disable();
        this.paymentForm.get(field)?.clearValidators();
      });
    }
    this.paymentForm.updateValueAndValidity();
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.paymentForm.patchValue({ amount });
  }

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
    this.paymentForm.patchValue({ paymentMethod: method });
  }

  calculateFee(): number {
    const method = this.paymentForm.get('paymentMethod')?.value;
    const amount = this.paymentForm.get('amount')?.value || 0;
    
    switch (method) {
      case 'card': return amount * 0.029;
      case 'paypal': return amount * 0.034;
      case 'crypto': return amount * 0.015;
      default: return 0;
    }
  }

  getTotalAmount(): number {
    const amount = this.paymentForm.get('amount')?.value || 0;
    return amount + this.calculateFee();
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.isProcessing = true;
      
      // Simulate payment processing
      setTimeout(() => {
        this.isProcessing = false;
        this.showConfirmation = true;
        
        // Redirect after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.paymentForm.controls).forEach(key => {
        this.paymentForm.get(key)?.markAsTouched();
      });
    }
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    event.target.value = formattedValue;
    this.paymentForm.patchValue({ cardNumber: value });
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
    this.paymentForm.patchValue({ expiryDate: value });
  }
}
