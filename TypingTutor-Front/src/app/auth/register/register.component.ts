import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (!this.email || !this.username || !this.password) {
      this.errorMessage = 'Të gjitha fushat janë të detyrueshme.';
      return;
    }
    const passwordError = this.validatePassword(this.password);
    if (passwordError) {
      this.errorMessage = passwordError;
      return;
    }
    const data = {
      email: this.email,
      username: this.username,
      password: this.password
    };

    this.authService.register(data).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during registration:', err);
       
      }
    });
  }

  validatePassword(password: string): string | null {
    if (password.length < 8) {
      return 'Fjalëkalimi duhet të ketë të paktën 8 karaktere.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Fjalëkalimi duhet të përmbajë të paktën një shkronjë të madhe.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Fjalëkalimi duhet të përmbajë të paktën një shkronjë të vogël.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Fjalëkalimi duhet të përmbajë të paktën një numër.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Fjalëkalimi duhet të përmbajë të paktën një karakter special.';
    }
    return null; 
  }

}
