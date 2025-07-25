import { Component } from '@angular/core';
import { LevelService } from '../../../service/level.service';
import { Level } from '../../../models/level';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrl: './level-list.component.css'
})
export class LevelListComponent {
  levels: Level[] = [];
  displayedColumns: string[] = ['levelNumber','name', 'difficulty', 'timeLimitInSeconds', 'actions'];
  constructor(private levelService: LevelService) {}

  ngOnInit(): void {
    this.loadLevels();
  }

  loadLevels(): void {
    this.levelService.getLevels().subscribe((data) => {
      this.levels = data;
      console.log(this.levels)
    });
  }

  deleteLevel(id: number): void {
    this.levelService.deleteLevel(id).subscribe(() => {
      this.loadLevels();
    });
  }
  difficultyLabels: { [key: number]: string } = {
    1: 'E ulët',
    2: 'Mesatare',
    3: 'E lartë'
  };
  
  getDifficultyLabel(difficulty: number): string {
    return this.difficultyLabels[difficulty] || ''; 
  }
  
}
