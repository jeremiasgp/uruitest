import { NgModule } from '@angular/core';
import { GameRoutingModule } from './game-routing.module';
import { PlayerComponent } from './player/player.component';
import { PlayComponent } from './play/play.component';
import { WinnerComponent } from './winner/winner.component';

@NgModule({
  imports: [
    GameRoutingModule
  ],
  declarations: [
    PlayerComponent,
    PlayComponent,
    WinnerComponent
  ]
})
export class GameModule {}
