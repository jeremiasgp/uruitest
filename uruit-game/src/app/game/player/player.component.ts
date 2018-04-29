import { Component, OnInit } from '@angular/core';
import { GameService } from '../../core/game.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {
  playerForm: FormGroup;
  nPlayer = 1;
  formSubmitted = false;
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.gameService.setGameInit(true);
    this.playerForm = new FormGroup({
      'player-name': new FormControl('',
      Validators.required)
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.playerForm.valid) {
      this.gameService.setPlayer(this.nPlayer, this.playerForm.controls['player-name'].value);
      if (this.nPlayer < 2) {
        this.nPlayer++;
        this.playerForm.reset();
        this.formSubmitted = false;
      } else {
        this.router.navigate(['/game/play']);
      }
    }
  }

}
