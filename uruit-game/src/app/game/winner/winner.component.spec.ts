import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerComponent } from './winner.component';
import { GameService } from '../../core/game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

const mockRouter = {
	navigate: jasmine.createSpy('navigate')
};

class serviceMock {
  winnerIs() {
    return 'Mike';
  }
}

describe('WinnerComponent', () => {
  let component: WinnerComponent;
  let fixture: ComponentFixture<WinnerComponent>;
  let service: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerComponent ],
      providers: [
        { provide: GameService, useClass: serviceMock },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GameService);
    service.players =
    [
      null,
      { name: 'Mike', choice: 'sicssors' },
      { name: 'Aneke', choice: 'rock'}
    ];
    fixture.detectChanges();
  });

  it('Should create Winner component', () => {
    expect(component).toBeTruthy();
  });
  it('Must render a message with Congratulations word and winner name in h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Congratulations');
    expect(compiled.querySelector('h1').textContent).toContain(component.winner);
  });
  it('Must navigate to homepage ater 3 seconds', async(() => {
    fixture.whenStable().then( () =>{
      setTimeout(() => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
      }, 5);
    } );
  }));
});
