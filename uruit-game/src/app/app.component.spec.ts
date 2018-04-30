import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from './core/game.service';

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule
      ],
      providers: [
        GameService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    service = TestBed.get(GameService);
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Game of drones');
  }));
  it('Should render credits on footer', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('footer > p').textContent).toContain('By Jeremias Garcia Pais for UruIt.');
  }));
  it('Game service must emit false for game init', async(() => {
    service.gameInit.subscribe( init => {
      expect(init).toEqual(false);
    })
  }));
});
