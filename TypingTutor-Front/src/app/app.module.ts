import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelListComponent } from './level/level-list/level-list.component';
import { LevelFormComponent } from './level/level-form/level-form.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // <-- Add this line
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './game/dashboard/dashboard.component';
import { EndOfGameComponent } from './game/end-of-game/end-of-game.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UserProgressListComponent } from './userProgress/user-progress-list/user-progress-list.component';
import { UserDashboardComponent } from './game/user-dashboard/user-dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminDashboardComponent } from './game/admin-dashboard/admin-dashboard.component';
import { KeyboardComponent } from './game/keyboard/keyboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TypingGameComponent } from './game/typing-game/typing-game.component';

@NgModule({
  declarations: [
    AppComponent,
    LevelListComponent,
    LevelFormComponent,
    HomeComponent,
    TypingGameComponent,
    DashboardComponent,
    EndOfGameComponent,
    UserProgressListComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    KeyboardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule, 
    HttpClientModule,  
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule ,
    MatGridListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
