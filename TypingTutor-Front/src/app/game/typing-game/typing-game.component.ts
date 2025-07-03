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
  levelId: number =1; // Start at level 1
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
      this.levelId = params['levelId'] ? params['levelId'] : 1;
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
  updateHandPosition(letter: string | undefined): void {
    let imagePath = 'assets/hints/default.jpg';
    if (!letter) {
   
        const handImageElement = document.getElementById('handImage') as HTMLImageElement;
        if (handImageElement) {
            handImageElement.src = imagePath;
        }
        return;
    }
    switch (letter.toLowerCase()) {
        case 'q': case 'a': case 'z':
            imagePath = 'assets/hints/left_pinky.jpg';
            break;
        case 'w': case 's': case 'x':
            imagePath = 'assets/hints/left_ring.jpg';
            break;
        case 'e': case 'd': case 'c':
            imagePath = 'assets/hints/left_middle.jpg';
            break;
        case 'r': case 'f': case 'v': case 't': case 'g': case 'b':
            imagePath = 'assets/hints/left_index.jpg';
            break;
        case 'y': case 'h': case 'n': case 'u': case 'j': case 'm':
            imagePath = 'assets/hints/right_index.jpg';
            break;
        case 'i': case 'k':
            imagePath = 'assets/hints/right_middle.jpg';
            break;
        case 'o': case 'l':
            imagePath = 'assets/hints/right_ring.jpg';
            break;
        case 'p': case ';':
        case 'ë': case 'Ë':
            imagePath = 'assets/hints/right_pinky.jpg';
            break;

     
        case '1': case '!': imagePath = 'assets/hints/left_pinky.jpg'; break;
        case '2': case '@': imagePath = 'assets/hints/left_ring.jpg'; break;
        case '3': case '#': imagePath = 'assets/hints/left_middle.jpg'; break;
        case '4': case '$': case '5': case '%': imagePath = 'assets/hints/left_index.jpg'; break;
        case '6': case '^': case '7': case '&': imagePath = 'assets/hints/right_index.jpg'; break;
        case '8': case '*': imagePath = 'assets/hints/right_middle.jpg'; break;
        case '9': case '(': case '0': case ')': imagePath = 'assets/hints/right_ring.jpg'; break;
        case '-': case '_': case '=': case '+': imagePath = 'assets/hints/right_pinky.jpg'; break;

      
        case '[': case '{': case ']': case '}': imagePath = 'assets/hints/right_pinky.jpg'; break;
        case '\\': case '|': imagePath = 'assets/hints/right_pinky.jpg'; break;
        case ';': case ':': case "'": case '"': imagePath = 'assets/hints/right_pinky.jpg'; break;
        case ',': case '<': case '.': case '>': case '/': case '?': imagePath = 'assets/hints/right_ring.jpg'; break;
        case ' ':
            imagePath = 'assets/hints/thumbs.jpg';
            break;
        case 'enter':
            imagePath = 'assets/hints/right_pinky.jpg';
            break;
    } 
    const handImageElement = document.getElementById('handImage') as HTMLImageElement;
    if (handImageElement) {
        handImageElement.src = imagePath;
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

    this.updateHandPosition(this.textToType[0]);

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
    const nextLetter = this.textToType[currentLength];  
    
    if (nextLetter) {
      this.updateHandPosition(nextLetter);
    } 

    if (this.userInput === this.textToType) {
      this.completeLevel();
      return;
    } 
    if (this.userInput[currentLength - 1] === this.textToType[currentLength - 1]) {
      this.correctSound.play();
    } else {
      this.incorrectSound.play();
      this.errors++;
    }
  }
  updateMetrics(startTime: number): void {
    const minutes = (this.timeLimitInSeconds - this.timer) / 60;
    if (minutes > 0 && this.userInput.length > 0) {
      this.speed = Math.round(this.userInput.length / 5 / minutes);
    } else {
      this.speed = 0;
    }
    if (this.userInput.length + this.errors > 0) {
      this.accuracy = Math.round((this.userInput.length / (this.userInput.length + this.errors)) * 100);
    } else {
      this.accuracy = 100;
    }
    this.score = this.userInput.length > 0 ? this.userInput.length - this.errors : 0;
  }

  completeLevel(): void {
    if (this.levelCompleted) {
        return; 
    }
    this.levelCompleted = true;
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

        this.router.navigate(['/dashboard'], { queryParams: { userProgress: JSON.stringify(userProgress) } });
    }, error => {
        console.error('Error saving progress:', error);
        this.levelCompleted = false; 
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
