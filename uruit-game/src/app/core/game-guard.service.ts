import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Observable } from "rxjs/observable";
import { GameService } from "./game.service";

@Injectable()
export class GameGuard implements CanActivate {

  constructor(
    private router: Router,
    private gameService: GameService
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.routeNeeds(state.url);
  }

  routeNeeds(r: string): boolean {
    if (r === '/game/play' && !!this.gameService.players[1] && !!this.gameService.players[2]){
      return true;
    }
    if (r === '/game/winner' && !!this.gameService.players[1] && !!this.gameService.players[2]){
      if(!!this.gameService.players[1].choice && !!this.gameService.players[2].choice) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}
