import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesComponent } from './choices.component';
import { GameService } from '../../../core/game.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChoicesComponent', () => {
  let component: ChoicesComponent;
  let fixture: ComponentFixture<ChoicesComponent>;
  let service: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
