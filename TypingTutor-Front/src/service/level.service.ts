import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Level } from '../models/level';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private apiUrl = 'https://localhost:7291/api/level';

  constructor(private http: HttpClient) {}

  getLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(this.apiUrl);
  }

  getLevelById(id: number): Observable<Level> {
    return this.http.get<Level>(`${this.apiUrl}/${id}`);
  }

  addLevel(level: Level): Observable<Level> {
    return this.http.post<Level>(this.apiUrl, level);
  }

  updateLevel(id: number, level: Level): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, level);
  }

  deleteLevel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
