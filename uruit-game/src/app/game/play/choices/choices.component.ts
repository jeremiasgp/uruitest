import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { GameService } from '../../../core/game.service';
import { IGameRules } from '../../game.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html'
})
export class ChoicesComponent implements OnInit {
  rules: IGameRules[];
  actualChoice: number;
  @Output() choice: EventEmitter<string> = new EventEmitter<string>();
  @Input() clean;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getRules$().subscribe(
      (r) => {
        this.rules = r;
    });
    this.clean.subscribe(
      () => {
        this.actualChoice = null;
      });
  }

  setChoice(i: number): void {
    this.actualChoice = i;
  }

  setPlayerChoice(): void {
    if (!!this.actualChoice) {
      this.choice.emit(this.rules[this.actualChoice].option);
    }
  }

}
