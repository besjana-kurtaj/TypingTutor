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
  currentKey: string = '';
  levelId: number =7; // Start at level 1
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
  userId: string; 
  leftHandClass: string = 'l1'; // Initial hand position class for left hand
  leftThumbClass: string = 'm1'; // Initial thumb class for left thumb
  rightHandClass: string = 'r1'; // Initial hand position class for right hand
  rightThumbClass: string = 'r1'; // Initial thumb class for right thumb
  correctSound = new Audio('assets/correct.mp3');
  incorrectSound = new Audio('assets/incorrect.mp3');
  constructor(private typingGameService: TypingGameService, private router: Router, private levelService: LevelService,private route: ActivatedRoute) {

    this.userId = localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.levelId = params['levelId'] ? params['levelId'] : 7;
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
  updateHandPosition(letter: string): void {
    let handImagePath = '';

    // Define which hand image should be shown
    switch (letter.toLowerCase()) {
        case 'a':
            handImagePath = 'hints/leftHand_pinky.png';
            break;
        case 's':
            handImagePath = 'hints/leftHand_ring.png';
            break;
        case 'd':
            handImagePath = 'hints/leftHand_middle.png';
            break;
        case 'f':
            handImagePath = 'hints/leftHand_index.png';
            break;
        case 'j':
            handImagePath = 'hints/rightHand_index.png';
            break;
        case 'k':
            handImagePath = 'hints/rightHand_middle.png';
            break;
        case 'l':
            handImagePath = 'hints/rightHand_ring.png';
            break;
        case ';':
            handImagePath = 'hints/rightHand_pinky.png';
            break;
        default:
            handImagePath = 'hints/defaultHands.png'; // Default hand position
            break;
    }

    // Update the hand image dynamically
    const handImageElement = document.getElementById('handImage') as HTMLImageElement;
    if (handImageElement) {
        handImageElement.src = handImagePath;
    }
}




resetFingers(): void {
    const fingers = [
        'leftPinky', 'leftRing', 'leftMiddle', 'leftIndex',
        'rightIndex', 'rightMiddle', 'rightRing', 'rightPinky',
        'leftThumb', 'rightThumb'
    ];
    
    fingers.forEach(finger => {
        const fingerElement = document.getElementById(finger);
        if (fingerElement) {
            fingerElement.classList.remove('highlight', 'highlight-red'); // Remove both highlights
        }
    });
}

  
  highlightFinger(fingerId: string): void {
    const fingerElement = document.getElementById(fingerId);
    if (fingerElement) {
      fingerElement.classList.add('highlight-red'); // Add red highlight
    }
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
  // updateHandPosition(letter: string) {
  //   // Example logic: Update hand/finger position based on the key
  //   switch (letter) {
  //     case 'a':
  //       this.leftHandClass = 'l2'; // Left hand finger 2
  //       this.leftThumbClass = 'm1'; // Left thumb
  //       break;
  //     case 'b':
  //       this.leftHandClass = 'l1'; // Left hand
  //       this.leftThumbClass = 'm2'; // Left thumb
  //       break;
  //     case 'z':
  //       this.leftHandClass = 'l3'; // Left hand finger 3
  //       this.leftThumbClass = 'm1'; // Left thumb
  //       break;
  //     case 'y':
  //       this.rightHandClass = 'r2'; // Right hand finger 2
  //       this.rightThumbClass = 'm1'; // Right thumb
  //       break;
  //     // Add cases for other letters and finger positions
  //     default:
  //       this.leftHandClass = 'l1'; // Default position for left hand
  //       this.rightHandClass = 'r1'; // Default position for right hand
  //   }
  // }
  // onType(event: Event): void {
  //   const currentLength = this.userInput.length;
  //   const currentLetter = this.userInput[this.userInput.length - 1];  // Get the last typed letter
  //   this.currentKey = currentLetter;  // Update the current key to be typed

  //   // Logic to update the hand position based on the current key
  //   this.updateHandPosition(currentLetter);

  //   // Kontrollo nëse përdoruesi ka përfunduar tekstin
  //   if (this.userInput === this.textToType) {
  //     this.completeLevel();
  //     return;
  //   }

  //   // Kontrollo shtypjen e saktë apo gabim dhe riprodho tingullin përkatës
  //   if (this.userInput[currentLength - 1] === this.textToType[currentLength - 1]) {
  //     this.correctSound.play();
  //   } else {
  //     this.incorrectSound.play();
  //     this.errors++;
  //   }
  // }
  onType(event: Event): void {
    const currentLength = this.userInput.length;
    const nextLetter = this.textToType[currentLength]; // Get the next letter to type
  
    // Update hand position based on the next letter
    if (nextLetter) {
      this.updateHandPosition(nextLetter);
  }
    // Check if the user has completed the text
    if (this.userInput === this.textToType) {
      this.completeLevel();
      return;
    }
  
    // Check for correct or incorrect typing
    if (this.userInput[currentLength - 1] === this.textToType[currentLength - 1]) {
      this.correctSound.play();
    } else {
      this.incorrectSound.play();
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
    this.userInput = '';  // Reset the user's input
      this.currentKey = '';  // Reset the current key
      // Reset hand positions for next level
      this.leftHandClass = 'l1';
      this.leftThumbClass = 'm1';
      this.rightHandClass = 'r1';
      this.rightThumbClass = 'r1';
    
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
