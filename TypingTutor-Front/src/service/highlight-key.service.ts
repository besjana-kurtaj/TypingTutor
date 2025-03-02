import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighlightKeyService {

  private highlightedKeySubject = new BehaviorSubject<string | null>(null);
  highlightedKey$ = this.highlightedKeySubject.asObservable();

  setHighlightedKey(key: string | null) {
    this.highlightedKeySubject.next(key);
  }
}
