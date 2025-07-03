import { Component, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { AuthService } from '../service/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  isAuthenticated = false;
  isAdmin = false;
  isUser = false;
  private authSubscription?: Subscription;

  constructor(
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.authState$.subscribe(authState => {
      this.isAuthenticated = authState.isAuthenticated;
      this.isAdmin = authState.isAdmin;
      this.isUser = authState.isUser;
      
      console.log('Auth state updated:', authState);
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}