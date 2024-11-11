import { Component } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
  ];

  highlightedKey: string | null = null;
  typingSequence = ['A', 'S', 'D', 'Space', 'Enter', '1', '2']; // Example sequence
  currentIndex = 0;

  ngOnInit() {
    this.highlightNextKey();
  }

  highlightNextKey() {
    if (this.currentIndex < this.typingSequence.length) {
      this.highlightedKey = this.typingSequence[this.currentIndex];
      this.currentIndex++;
    } else {
      this.clearHighlight();
      this.currentIndex = 0; // Reset if needed
    }
  }

  clearHighlight() {
    this.highlightedKey = null;
  }
}
