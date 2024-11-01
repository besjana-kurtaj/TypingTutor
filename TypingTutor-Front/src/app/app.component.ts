import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from "./game/game.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TypingTutor-Front';
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (this.isMenuOpen) {
      navbar.classList.add('show'); 
    } else {
      navbar.classList.remove('show'); // Remove class to hide the navbar
    }
  }
}
