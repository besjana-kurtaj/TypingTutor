import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-of-game',
  templateUrl: './end-of-game.component.html',
  styleUrl: './end-of-game.component.css'
})
export class EndOfGameComponent {
  constructor(private router: Router) {}

  goToHomePage(): void {
    this.router.navigate(['/']); 
  }
}
