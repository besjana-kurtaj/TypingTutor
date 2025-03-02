import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}




  reloadPage() {
    window.location.reload();
  }
  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email-i dhe fjalëkalimi janë të detyrueshëm.';
      return;
    }
  
    const data = {
      email: this.email,
      password: this.password,
    };
  
    this.authService.login(data).subscribe({
      next: (response: any) => {
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', JSON.stringify(response.role)); 
        console.log(response);
          if (response.role.includes('admin')) {
            this.router.navigate(['/admin/dashboard']);
          } else if (response.role.includes('user')){
            this.router.navigate(['/user/dashboard']);
          }      
      },
      error: (err) => {
        this.errorMessage = 'Email-i ose fjalëkalimi janë të pasakta.'; 
        console.error('Error during login:', err);
      }
    });
  }
  

}
