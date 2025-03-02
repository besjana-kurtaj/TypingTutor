import { Component } from '@angular/core';
import { TypingGameService } from '../../../service/typing-game.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
 userId:string; 
  userProgress: any;
  performanceHistory: any[] = [];
  performanceData: any[] = [];
  displayedColumns: string[] = ['date', 'speed', 'accuracy', 'errors'];
  constructor(private userProgressService: TypingGameService) {

    this.userId = localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.loadCurrentProgress();
    this.loadPerformanceHistory();
  }
  reloadPage() {
    window.location.reload();
  }
  loadCurrentProgress() {
    this.userProgressService.getCurrentProgress(this.userId).subscribe(
      (data) => {
        this.userProgress = data;
      },
      (error) => console.error('Failed to load current progress', error)
    );
  }

  loadPerformanceHistory() {
    this.userProgressService.getPerformanceHistory(this.userId).subscribe(
      (data) => {
        this.performanceData = data 
      },
      (error) => console.error('Failed to load performance history', error)
    );
  }
}
