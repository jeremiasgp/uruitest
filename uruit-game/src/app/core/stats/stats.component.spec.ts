import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { GameService } from '../game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsComponent ],
      providers: [ GameService ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    component.stats = [
      {'player': 'Floor', 'score': '23'},
      {'player': 'Mike', 'score': '21'},
      {'player': 'Ian', 'score': '17'},
      {'player': 'Aneke', 'score': '16'}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should render a table of players stats, and stats strings must be present', () => {
    const compiled = fixture.debugElement.nativeElement;
    const firstStat = compiled.querySelector('.table__body > tr');
    expect(firstStat.textContent).toContain(component.stats[0].player);
    expect(firstStat.textContent).toContain(component.stats[0].score);
  });
});
