import { Component } from '@angular/core';
import { TypingGameService } from '../../../service/typing-game.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  userProgressHistory: any[] = [];
  userStatistics: any | null = null;
  displayedColumns: string[] = ['userName', 'levelId', 'speed', 'accuracy', 'errors', 'completionDate'];

  constructor(private adminDashboardService: TypingGameService) {}

  ngOnInit(): void {
    this.loadUserProgressHistory();
    this.loadUserStatistics();
  }

  loadUserProgressHistory() {
    this.adminDashboardService.getAllUsersPerformanceHistory().subscribe(
      data => this.userProgressHistory = data,
      error => console.error('Error loading user progress history', error)
    );
  }

  loadUserStatistics() {
    this.adminDashboardService.getOverallUserStatistics().subscribe(
      data => this.userStatistics = data,
      error => console.error('Error loading user statistics', error)
    );
  }
}
