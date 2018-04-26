import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { PlayComponent } from './play/play.component';
import { WinnerComponent } from './winner/winner.component';

const gameRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'player' },
      { path: 'player', component: PlayerComponent },
      { path: 'play', component: PlayComponent },
      { path: 'winner', component: WinnerComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(gameRoutes) ],
  exports: [RouterModule]
})
export class GameRoutingModule {}
