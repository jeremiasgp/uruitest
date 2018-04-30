import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { GameService } from '../game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ GameService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GameService);
    fixture.detectChanges();
  });

  it('should create Header component', () => {
    expect(component).toBeTruthy();
  });
  it('Must have an App description "Rock - Paper - Scissors"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p.header__description').textContent)
    .toContain('Rock - Paper - Scissors');
  });
  it('Should have two nav options, New Game and Stats. And Cancel Game must not exists', () => {
    const compiled = fixture.debugElement.nativeElement;
    const nav = compiled.querySelector('ul.header__nav');
    expect(nav.textContent).toContain('New Game');
    expect(nav.textContent).toContain('Stats');
    expect(nav.textContent).not.toContain('Cancel Game');
  });
});
