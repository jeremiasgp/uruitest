import { Observable } from 'rxjs/Observable';
import { IStatsInterface } from './core.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { IGameRules, IPlayerData } from '../game/game.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  gameInit: BehaviorSubject<boolean> = new BehaviorSubject(false);
  players: IPlayerData[] = [];
  rules: IGameRules[];
  winner: string;

  constructor(private http: HttpClient) {}

  getRules$(): Observable<IGameRules[]> {
    return this.http.get<IGameRules[]>(`http://localhost:8080/api/game/rules`)
    .map(
      (r) => {
        this.rules = r;
        return r;
      }
    );
  }

  getStats$(): Observable<IStatsInterface[]> {
    return this.http.get<IStatsInterface[]>(`http://localhost:8080/api/game/stats`);
  }

  setGameInit(init: boolean): void {
    this.gameInit.next(init);
  }

  setPlayer(n: number, player: string): void {
    this.players[n] = { name: player };
  }

  setChoice(n: number, c: string): void {
    this.players[n].choice = c;
  }

  winnerIs(): string {
    this.winner = this.players[2].name;
    for (const rule of this.rules) {
      if (rule.option === this.players[1].choice && rule.beat === this.players[2].choice) {
        this.winner = this.players[1].name;
      }
    }
    this.winnerToStats$().subscribe();
    return this.winner;
  }

  winnerToStats$(): Observable<any> {
    return this.http.put(`http://localhost:8080/api/game/stats`, { name: this.winner });
  }

}
