import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesComponent } from './choices.component';
import { GameService } from '../../../core/game.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { by } from 'protractor';

describe('ChoicesComponent', () => {
  let component: ChoicesComponent;
  let fixture: ComponentFixture<ChoicesComponent>;
  let service: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesComponent ],
      providers: [ GameService ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GameService);
    component.clean = new BehaviorSubject(false);
    component.rules = [
      { "option": "rock", "beat": "scissors", "iconClass": "far fa-hand-rock" },
      { "option": "scissors", "beat": "paper", "iconClass": "far fa-hand-scissors" },
      { "option": "paper", "beat": "rock", "iconClass": "far fa-hand-paper" }
    ];
    fixture.detectChanges();
  });

  it('Should create Choices Component', () => {
    expect(component).toBeTruthy();
  });
  it('Should render buttons equal than rules', () => {
    const compiled = fixture.debugElement.nativeElement;
    const items = compiled.querySelectorAll('.choices__item > .btn');
    expect(items.length).toEqual(component.rules.length);
  });
  it('Should call setChoice when choice button is clicked', () => {
    const setChoice = spyOn(component, 'setChoice');
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('.choices__item > .btn');
    button.click();
    fixture.detectChanges();
    expect(setChoice).toHaveBeenCalled();
  });
  it('Should emit choice string when button Next is clicked', () => {
    // Manually set choice
    const choice = 1;
    component.setChoice(choice);
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('.btn.btn--blue');
    button.click();
    fixture.detectChanges();
    component.choice.subscribe(
      choice => {
        expect(choice).toEqual(component.rules[choice].option);
      }
    )
  });
});
