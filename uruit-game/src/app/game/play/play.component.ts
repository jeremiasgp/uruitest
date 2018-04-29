import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GameService } from '../../core/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html'
})
export class PlayComponent implements OnInit {
  nPlayer = 1;
  playerName: string;
  @Output() playerChoices: EventEmitter<string> = new EventEmitter<string>();

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.setPlayerName();
  }

  setPlayerName(): void {
    this.playerName = this.gameService.players[this.nPlayer].name;
  }

  setChoice(choice: string): void {
    this.gameService.players[this.nPlayer].choice = choice;
    if (this.nPlayer < 2) {
      this.nPlayer++;
      this.setPlayerName();
      this.playerChoices.emit('clean');
    } else {
      this.router.navigate(['/game/winner']);
    }
  }

}
