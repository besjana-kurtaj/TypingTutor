import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from '../../../service/level.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userProgress: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private levelService: LevelService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userProgress = JSON.parse(params['userProgress']);
    });
  }

  loadNextLevel(): void {
    const currentLevelNumber = this.userProgress.levelNumber;

 
    this.levelService.getNextLevel(currentLevelNumber).subscribe(
      (nextLevel) => {
        console.log(nextLevel);
        if (nextLevel && nextLevel.levelNumber) {
          this.router.navigate(['game/'], { queryParams: { levelId: nextLevel.levelId } });
        } else {
          this.router.navigate(['/end-of-game']); 
        }
      },
      (error) => {
        this.router.navigate(['/end-of-game']); 
      }
    );
  }
}
