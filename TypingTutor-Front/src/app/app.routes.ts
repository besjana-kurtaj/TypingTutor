import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    // { path: 'login', component: LoginComponent },
    { path: 'game', component: GameComponent,  },
    // { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
];
