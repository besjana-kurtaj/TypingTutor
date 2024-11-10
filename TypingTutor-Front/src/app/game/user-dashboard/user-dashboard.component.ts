import { Component } from '@angular/core';
import { TypingGameService } from '../../../service/typing-game.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  userId = 'cb55ad00-177b-484e-86fc-56b4cb9f86b1'; // Replace this with actual user ID
  userProgress: any;
  performanceHistory: any[] = [];
  performanceData: any[] = [];
  displayedColumns: string[] = ['date', 'speed', 'accuracy', 'errors'];
  constructor(private userProgressService: TypingGameService) {}

  ngOnInit(): void {
    this.loadCurrentProgress();
    this.loadPerformanceHistory();
  }

  loadCurrentProgress() {
    this.userProgressService.getCurrentProgress(this.userId).subscribe(
      (data) => {this.userProgress = data;
        console.log(this.userProgress)
      },
      (error) => console.error('Failed to load current progress', error)
    );
  }

  loadPerformanceHistory() {
    this.userProgressService.getPerformanceHistory(this.userId).subscribe(
      (data) => {this.performanceData = data 
        console.log(this.performanceHistory)
      },
      (error) => console.error('Failed to load performance history', error)
    );
  }
}
