import { Component } from '@angular/core';
import { TypingGameService } from '../../../service/typing-game.service';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from '../../../service/level.service';

@Component({
  selector: 'app-typing-game',
  templateUrl: './typing-game.component.html',
  styleUrl: './typing-game.component.css'
})
export class TypingGameComponent {
  levelId: number = 5; // Start at level 1
  textToType: string = '';
  userInput: string = '';
  speed: number = 0;
  accuracy: number = 100;
  score: number = 0;
  errors: number = 0;
  timer: number = 0;
  difficulty: number=1;
  timeLimitInSeconds: number = 60; // Default, will be overwritten by level data
  countdownSubscription: Subscription | null = null;
  levelCompleted: boolean = false;
  levelNumber:number=0;
  userId: string = "cb55ad00-177b-484e-86fc-56b4cb9f86b1"; // Static user ID for testing

  constructor(private typingGameService: TypingGameService, private router: Router, private levelService: LevelService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.levelId = params['levelId'] ? params['levelId'] : 5;
      this.loadLevelData(this.levelId);
    });
   
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
        this.timeLimitInSeconds = level.timeLimitInSeconds; 
        this.difficulty=level.difficulty;
        this.levelNumber=level.levelNumber
        this.startGame();
      } else {
        console.error("Invalid level data or no more levels.");
        this.router.navigate(['/end-of-game']); 
      }
    }, error => {
      console.error('Error loading level data:', error);
      this.router.navigate(['/end-of-game']); 
    });
  }

  startGame(): void {
    this.userInput = '';
    this.errors = 0;
    this.levelCompleted = false;
    this.timer = this.timeLimitInSeconds;
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
    if (this.levelCompleted) {
        return; // Exit if already completed to prevent multiple saves
    }

    this.levelCompleted = true; // Set flag to true after the first call
    this.countdownSubscription?.unsubscribe();

    const userProgress = {
        userId: this.userId,
        levelId: this.levelId,
        speed: this.speed,
        accuracy: this.accuracy,
        errors: this.errors,
        completionDate: new Date(),
        levelNumber: this.levelNumber
    };

    this.typingGameService.saveProgress(userProgress).subscribe(response => {
        console.log(`Progress saved for Level ${this.levelId}:`, response);

        // Navigate to dashboard after saving progress
        this.router.navigate(['/dashboard'], { queryParams: { userProgress: JSON.stringify(userProgress) } });
    }, error => {
        console.error('Error saving progress:', error);
        this.levelCompleted = false; // Reset flag on error to allow retry
    });
}


  loadNextLevel(): void {
    this.completeLevel();
  
  }
  getDifficultyColor(difficulty: number): string {
    switch (difficulty) {
      case 1:
        return 'green'; 
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return 'black';
    }
  }

  getDifficultyText(difficulty: number): string {
    switch (difficulty) {
      case 1:
        return 'E Lehtë';
      case 2:
        return 'Mesatare';
      case 3:
        return 'E Vështirë';
      default:
        return 'Zgjidhni Vështirësinë';
    }
  }
  
}
