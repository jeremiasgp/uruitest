import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { PlayComponent } from './play/play.component';
import { WinnerComponent } from './winner/winner.component';
import { GameGuard } from '../core/game-guard.service';

const gameRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'player' },
      { path: 'player', component: PlayerComponent },
      { path: 'play', canActivate: [GameGuard], component: PlayComponent },
      { path: 'winner', canActivate: [GameGuard], component: WinnerComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(gameRoutes) ],
  exports: [RouterModule],
  providers: [GameGuard]
})
export class GameRoutingModule {}
