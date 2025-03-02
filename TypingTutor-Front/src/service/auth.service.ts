import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7291/api/auth'; 
  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());
  authState$ = this.authState.asObservable();
  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object,private storageService: StorageService) {}

  register(data: { email: string; username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('token');
  }
  
  logout(): void {
    this.storageService.clear();
    this.authState.next(false);
  }
  
}
