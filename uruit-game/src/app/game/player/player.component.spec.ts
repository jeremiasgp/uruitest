import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { GameService } from '../../core/game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

const mockRouter = {
	navigate: jasmine.createSpy('navigate')
};

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let service: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerComponent ],
      providers: [GameService, { provide: Router, useValue: mockRouter }],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GameService);
    fixture.detectChanges();
  });

  it('Should create Player component', () => {
    expect(component).toBeTruthy();
  });
  it('Should render a title with player number', () => {
    const compiled =  fixture.debugElement.nativeElement;
    const title = compiled.querySelector('h2');
    const player = component.nPlayer;
    expect(title.textContent).toContain(player);
  });
  it('Service game init must emit a true value', () => {
    service.gameInit.subscribe(
      init => { expect(init).toBe(true); }
    );
  })
  it('Should have an empty field, but no one error message is present', () => {
    const compiled =  fixture.debugElement.nativeElement;
    const field = compiled.querySelector('.form__input');
    const error = compiled.querySelector('.form__error');
    expect(field).toBeTruthy();
    expect(error).toBeFalsy();
  });
  it('Must show an error message when Next button is clicked and input field is empty', async(() => {
    const compiled =  fixture.debugElement.nativeElement;
    const button = compiled.querySelector('.btn');
    button.click();
    fixture.detectChanges();
    const error = compiled.querySelector('.form__error');
    expect(error).toBeTruthy();
  }));
  it('Must go to next Player input name when player 1 set his or her name', async(() => {
    const player = component.nPlayer;
    component.playerForm.controls['player-name'].setValue('Mike');
    const compiled =  fixture.debugElement.nativeElement;
    const button = compiled.querySelector('.btn');
    button.click();
    fixture.detectChanges();
    const title = compiled.querySelector('h2');
    expect(component.nPlayer).not.toEqual(player);
    expect(title.textContent).toContain( player + 1 );
  }));
  it('Must navigate to /game/play when player 2 set his or her name', async(() => {
    component.nPlayer = 2;
    component.playerForm.controls['player-name'].setValue('Aneke');
    const compiled =  fixture.debugElement.nativeElement;
    const button = compiled.querySelector('.btn');
    button.click();
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/game/play']);
  }));
});
