import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypingGameService {
  private levelApiUrl = 'https://localhost:7291/api/Level';
  private userProgressApiUrl = 'https://localhost:7291/api/UserProgress';

  constructor(private http: HttpClient) {}

  getLevelById(levelId: number): Observable<any> {
    return this.http.get(`${this.levelApiUrl}/${levelId}`);
  }

  saveProgress(progressData: any): Observable<any> {
    return this.http.post('https://localhost:7291/api/UserProgress', progressData);
  }
  getCurrentProgress(userId: string): Observable<any> {
    return this.http.get<any>(`${this.userProgressApiUrl}/${userId}/current`);
  }

  getPerformanceHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.userProgressApiUrl}/${userId}/history`);
  }
  getAllUsersPerformanceHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.userProgressApiUrl}/all-history`);
  }

  getOverallUserStatistics(): Observable<any> {
    return this.http.get<any>(`${this.userProgressApiUrl}/statistics`);
  }
}
