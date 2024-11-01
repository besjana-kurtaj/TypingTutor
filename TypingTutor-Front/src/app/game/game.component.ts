import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  levels = [
    { text: "The quick brown fox jumps over the lazy dog", difficulty: 1, timeLimit: 30 },
    { text: "An agile juggler makes amazing tricks look easy", difficulty: 2, timeLimit: 25 },
    { text: "With every strike, the skilled drummer plays faster", difficulty: 3, timeLimit: 20 }
  ];
  
  currentLevel = 0;
  targetText = '';
  userInput = '';
  completed = false;
  accuracy = 0;
  typingSpeed = 0;
  timer = 0; // Time counter
  timeLimit = 0; // Time limit for current level
  typedDisplay: Array<{ char: string, correct: boolean | null }> = [];
  timerInterval: any;
  startTime: number | null = null;
  gameStarted = false;

  startGame() {
    this.gameStarted = true;
    this.targetText = this.levels[this.currentLevel].text;
    this.timeLimit = this.levels[this.currentLevel].timeLimit;
    this.resetGame();
  }

  updateTypedTextDisplay() {
    const typedChars = this.userInput.split('');
    const targetChars = this.targetText.split('');
    this.typedDisplay = targetChars.map((char, index) => ({
      char,
      correct: index < typedChars.length ? typedChars[index] === char : null
    }));
  }

  checkInput() {
    if (!this.startTime) this.startTime = new Date().getTime();
    this.updateTypedTextDisplay();

    if (this.userInput === this.targetText) {
      this.completed = true;
      this.calculateAccuracy();
      this.calculateSpeed();
      clearInterval(this.timerInterval);
    }
  }

  calculateAccuracy() {
    const correctChars = this.userInput.split('').filter((char, index) => char === this.targetText[index]).length;
    this.accuracy = Math.floor((correctChars / this.targetText.length) * 100);
  }

  calculateSpeed() {
    if (this.startTime) {
      const timeTaken = (new Date().getTime() - this.startTime) / 1000;
      this.typingSpeed = Math.floor((this.userInput.length / timeTaken) * 60);
    }
  }

  startTimer() {
    this.timer = this.timeLimit;
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.timerInterval);
        this.completed = true; // Automatically mark as complete when time runs out
        this.calculateAccuracy();
        this.calculateSpeed();
      }
    }, 1000);
  }

  nextLevel() {
    if (this.currentLevel < this.levels.length - 1) {
      this.currentLevel++;
      this.startGame(); // start game for the next level
    } else {
      alert('Congratulations! You completed all levels!');
      this.resetGame();
      this.gameStarted = false; // End the game
    }
  }

  resetGame() {
    this.targetText = this.levels[this.currentLevel].text;
    this.userInput = '';
    this.completed = false;
    this.accuracy = 0;
    this.typingSpeed = 0;
    this.startTime = null;
    this.typedDisplay = [];
    clearInterval(this.timerInterval);
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }
}