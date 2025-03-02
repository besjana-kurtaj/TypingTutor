import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthenticated = false;
  isAdmin = false;
  isUser = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object ) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role'); 

      this.isAuthenticated = !!token;

      this.isAdmin = role === '"admin"';
      this.isUser = role === '"user"';

      console.log('Token:', token);
      console.log('Role:', role);
      console.log('Authenticated:', this.isAuthenticated);
    } else {
      console.log('Non-browser environment: Skipping authentication check.');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}