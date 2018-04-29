import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GameRoutingModule } from './game-routing.module';
import { PlayerComponent } from './player/player.component';
import { PlayComponent } from './play/play.component';
import { WinnerComponent } from './winner/winner.component';
import { CommonModule } from '@angular/common';
import { ChoicesComponent } from './play/choices/choices.component';

@NgModule({
  imports: [
    GameRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    PlayerComponent,
    PlayComponent,
    WinnerComponent,
    ChoicesComponent
  ]
})
export class GameModule {}
