import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';
import { ChoicesComponent } from './choices/choices.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameService } from '../../core/game.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;
  let service: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayComponent, ChoicesComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        GameService,
        { provide: Router, useValue: mockRouter }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GameService);
    service.players = [null, { name: 'Mike', choice: 'sicssors' }, { name: 'Aneke', choice: 'rock'}];
    fixture.detectChanges();
  });

  it('Should create Play component', () => {
    expect(component).toBeTruthy();
  });
  it('Should render a title with player name inside', () => {
    const compiled = fixture.debugElement.nativeElement;
    const name = service.players[1].name;
    expect(compiled.querySelector('h2').textContent).toContain(name);
  });
  it('Should render player 2 name when player 1 choice is setted', () => {
    component.setChoice('paper');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const name = service.players[2].name;
    expect(compiled.querySelector('h2').textContent).toContain(name);
  });
  it('Should navigate to /game/wnner when two players choices are setted', () => {
    component.nPlayer = 2;
    component.setChoice('scissors');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/game/winner']);
  });
});
