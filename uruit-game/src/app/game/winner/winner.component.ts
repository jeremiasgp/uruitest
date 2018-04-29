import { Component, OnInit } from '@angular/core';
import { GameService } from '../../core/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html'
})
export class WinnerComponent implements OnInit {
  winner: string;
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.winner = this.gameService.winnerIs();
    setTimeout(() => { this.resetGame() }, 3000);
  }
  resetGame(): void {
    this.router.navigate(['/']);
  }
}
