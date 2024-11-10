import { Component } from '@angular/core';
import { Level } from '../../../models/level';
import { LevelService } from '../../../service/level.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-level-form',
  templateUrl: './level-form.component.html',
  styleUrl: './level-form.component.css'
})
export class LevelFormComponent {
  level: Level = { levelId: 0, name: '', difficulty: 0, timeLimitInSeconds: 60 , description:'',levelNumber:0};
  isEditMode: boolean = false;

  constructor(
    private levelService: LevelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const levelId = +this.route.snapshot.paramMap.get('id')!;
    if (levelId) {
      this.isEditMode = true;
      this.levelService.getLevelById(levelId).subscribe((data) => {
        this.level = data;
      });
    }
  }

  saveLevel(): void {
    if (this.isEditMode) {
      const levelId = this.level?.levelId ?? 0;
      this.levelService.updateLevel(levelId, this.level).subscribe(() => {
        this.router.navigate(['/levels']);
      });
    } else {
      this.levelService.addLevel(this.level).subscribe(() => {
        this.router.navigate(['/levels']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/levels']);
  }
}
