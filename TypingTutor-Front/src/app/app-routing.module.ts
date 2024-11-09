import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelListComponent } from './level/level-list/level-list.component';
import { LevelFormComponent } from './level/level-form/level-form.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TypingGameComponent } from './game/typing-game/typing-game.component';

const routes: Routes = [
  { path: '', component: HomeComponent },            
  { path: 'game', component: TypingGameComponent },          
  { path: 'levels', component: LevelListComponent },          
  { path: 'add-level', component: LevelFormComponent },      
  { path: 'edit-level/:id', component: LevelFormComponent },
  { path: '**', redirectTo: '' }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
