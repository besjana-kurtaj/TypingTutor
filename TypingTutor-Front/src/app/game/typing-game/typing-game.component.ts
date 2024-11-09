import { Component } from '@angular/core';
import { TypingGameService } from '../../../service/typing-game.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-typing-game',
  templateUrl: './typing-game.component.html',
  styleUrl: './typing-game.component.css'
})
export class TypingGameComponent {
  levelId: number = 9; // Start at level 1
  textToType: string = '';
  userInput: string = '';
  speed: number = 0;
  accuracy: number = 100;
  score: number = 0;
  errors: number = 0;
  timer: number = 0;
  timeLimitInSeconds: number = 60; // Default, will be overwritten by level data
  countdownSubscription: Subscription | null = null;
  levelCompleted: boolean = false;
  userId: string = "f1f43ee1-349c-4c1e-8cda-6c29d428f158"; // Static user ID for testing

  constructor(private typingGameService: TypingGameService) {}

  ngOnInit(): void {
    this.loadLevelData(this.levelId);
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  loadLevelData(levelId: number): void {
    this.typingGameService.getLevelById(levelId).subscribe(level => {
      if (level && level.description && level.timeLimitInSeconds) {
        this.textToType = level.description;
        this.timeLimitInSeconds = level.timeLimitInSeconds; // Use time limit from level data
        this.startGame();
      } else {
        console.error("Invalid level data or no more levels.");
      }
    }, error => {
      console.error('Error loading level data:', error);
    });
  }

  startGame(): void {
    this.userInput = '';
    this.errors = 0;
    this.levelCompleted = false;
    this.timer = this.timeLimitInSeconds; // Initialize timer with level's time limit
    this.startTimer();

    const startTime = new Date().getTime();
    interval(1000).subscribe(() => this.updateMetrics(startTime));
  }

  startTimer(): void {
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.completeLevel();
      }
    });
  }

  onType(event: Event): void {
    const currentLength = this.userInput.length;

    if (this.userInput === this.textToType) {
      this.completeLevel();
      return;
    }

    if (this.userInput[currentLength - 1] !== this.textToType[currentLength - 1]) {
      this.errors++;
    }
  }

  updateMetrics(startTime: number): void {
    const elapsedMinutes = (new Date().getTime() - startTime) / 60000;
    this.speed = Math.round((this.userInput.length / 5) / elapsedMinutes);
    this.accuracy = Math.round(((this.userInput.length - this.errors) / this.userInput.length) * 100);
    this.score = this.speed * this.accuracy;
  }

  completeLevel(): void {
    this.levelCompleted = true;
    this.countdownSubscription?.unsubscribe();

    // Prepare UserProgress data
    const userProgress = {
      userId: this.userId,
      levelId: this.levelId,
      speed: this.speed,
      accuracy: this.accuracy,
      completionDate: new Date()
    };

    // Save progress to backend
    this.typingGameService.saveProgress(userProgress).subscribe(response => {
      console.log(`Progress saved for Level ${this.levelId}:`, response);
    }, error => {
      console.error('Error saving progress:', error);
    });
  }


  loadNextLevel(): void {
    this.levelId++;
    this.loadLevelData(this.levelId);
  }
  
}
