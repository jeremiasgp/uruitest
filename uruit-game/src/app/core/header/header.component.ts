import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../game.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  gameInit: BehaviorSubject<boolean>;
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameInit = this.gameService.gameInit;
  }

}
