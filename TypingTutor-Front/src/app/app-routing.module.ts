import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelListComponent } from './level/level-list/level-list.component';
import { LevelFormComponent } from './level/level-form/level-form.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TypingGameComponent } from './game/typing-game/typing-game.component';
import { DashboardComponent } from './game/dashboard/dashboard.component';
import { EndOfGameComponent } from './game/end-of-game/end-of-game.component';
import { UserDashboardComponent } from './game/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './game/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from '../service/authGuard';

const routes: Routes = [
  { path: '', component: HomeComponent },            
  { path: 'game', component: TypingGameComponent,canActivate: [AuthGuard] },          
  { path: 'game/:id', component: TypingGameComponent ,canActivate: [AuthGuard]},     
  { path: 'levels', component: LevelListComponent,canActivate: [AuthGuard] },          
  { path: 'add-level', component: LevelFormComponent,canActivate: [AuthGuard] },      
  { path: 'edit-level/:id', component: LevelFormComponent,canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'user/dashboard', component: UserDashboardComponent,canActivate: [AuthGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent,canActivate: [AuthGuard] },
  { path: 'end-of-game', component: EndOfGameComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
