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
  level: Level = { levelId: 0, name: 'Niveli', difficulty: 0, timeLimitInSeconds: 60 , description:'',levelNumber:0};
  isEditMode: boolean = false;
  errorMessage: string = '';
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
  validateLevel(): string | null {
    if (this.level.levelNumber <= 0) {
      return 'Numri i nivelit duhet të jetë më i madh se zero.';
    }
    if (!this.level.name.trim()) {
      return 'Emri i nivelit është i detyrueshëm.';
    }
    if (this.level.difficulty < 1 || this.level.difficulty > 3) {
      return 'Ju duhet të zgjidhni një vështirësi të vlefshme.';
    }
    if (this.level.timeLimitInSeconds < 10) {
      return 'Kohëzgjatja duhet të jetë të paktën 10 sekonda.';
    }
    if (!this.level.description.trim()) {
      return 'Përshkrimi është i detyrueshëm.';
    }
    return null; 
  }
  saveLevel(): void {
    const validationError = this.validateLevel();
    if (validationError) {
      this.errorMessage = validationError;
      return;
    }
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
