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

import { HomeComponent } from './home/home.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { TypingGameComponent } from './game/typing-game/typing-game.component';

@NgModule({
  declarations: [
    AppComponent,
    LevelListComponent,
    LevelFormComponent,
    HomeComponent,
    TypingGameComponent
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
    MatInputModule, // <-- Add this to imports
    HttpClientModule,  
    FormsModule,
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
