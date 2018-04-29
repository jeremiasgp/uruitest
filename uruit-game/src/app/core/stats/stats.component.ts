import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { IStatsInterface } from '../core.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {
  stats: IStatsInterface[];
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getStats$().subscribe(
      (stats) => {
        this.stats = stats;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
