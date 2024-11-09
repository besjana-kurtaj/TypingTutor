import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userProgress: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userProgress = JSON.parse(params['userProgress']);
    });
  }

  loadNextLevel(): void {
    this.router.navigate(['game/'], { queryParams: { levelId: this.userProgress.levelId + 2 } });
  }
}
