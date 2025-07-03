import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  token?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7291/api/auth'; 
  private authState = new BehaviorSubject<AuthState>(this.getInitialAuthState());
  authState$ = this.authState.asObservable();
  
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private storageService: StorageService) {
    // Refresh auth state on service initialization
    this.refreshAuthState();
  }

  private getInitialAuthState(): AuthState {
    return {
      isAuthenticated: false,
      isAdmin: false,
      isUser: false
    };
  }

  private refreshAuthState(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.storageService.getItem('token');
      const role = this.storageService.getItem('role');
      
      console.log('Refreshing auth state - Token:', token, 'Role:', role);
      
      const newAuthState: AuthState = {
        isAuthenticated: !!token,
        isAdmin: role === '"admin"',
        isUser: role === '"user"',
        token: token || undefined,
        role: role || undefined
      };
      
      console.log('Setting initial auth state to:', newAuthState);
      this.authState.next(newAuthState);
    }
  }

  register(data: { email: string; username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  updateAuthState(response: any): void {
    this.storageService.setItem('userId', response.userId);
    this.storageService.setItem('token', response.token);
    this.storageService.setItem('role', JSON.stringify(response.role));
    
    const newAuthState: AuthState = {
      isAuthenticated: true,
      isAdmin: response.role.includes('admin'),
      isUser: response.role.includes('user'),
      token: response.token,
      role: JSON.stringify(response.role)
    };
    
    console.log('Updating auth state to:', newAuthState);
    this.authState.next(newAuthState);
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('token');
  }
  
  logout(): void {
    this.storageService.clear();
    this.authState.next({
      isAuthenticated: false,
      isAdmin: false,
      isUser: false
    });
  }
  
  getCurrentAuthState(): AuthState {
    return this.authState.value;
  }
}
