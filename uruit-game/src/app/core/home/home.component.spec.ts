import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { GameService } from '../game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [GameService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Home component', () => {
    expect(component).toBeTruthy();
  });
  it('Should render a Welcome title in h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    const title = compiled.querySelector('h2');
    expect(title.textContent).toContain('Welcome');
  });
  it('Should have an image', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img')).toBeTruthy();
  });
  it('Should have a button with New Game text', () => {
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('.btn');
    expect(button.textContent).toContain('New Game');
  });
});
