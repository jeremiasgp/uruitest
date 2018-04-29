import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.setGameInit(false);
  }

}
