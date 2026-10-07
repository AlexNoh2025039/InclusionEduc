import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-card.html',
  styleUrl: './login-card.css'
})
export class LoginCardComponent {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  name = '';
  confirmPassword = '';
  isRegisterMode = false;
  errorMessage = '';
  isSubmitting = false;

  showRegister(): void {
    this.isRegisterMode = true;
    this.errorMessage = '';
  }

  showLogin(): void {
    this.isRegisterMode = false;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Completa el correo y la contraseña.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.api.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('inclusionEduc-token', response.token);
        localStorage.setItem('inclusionEduc-user', JSON.stringify(response.usuario));
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas.';
        this.isSubmitting = false;
      },
    });
  }

  register(): void {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Completa todos los campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.api.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.isRegisterMode = false;
        this.errorMessage = 'Cuenta creada. Inicia sesión con tus credenciales.';
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo crear la cuenta. Inténtalo de nuevo.';
        this.isSubmitting = false;
      },
    });
  }
}