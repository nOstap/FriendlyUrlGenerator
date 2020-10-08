import { fingerprint } from '@angular/compiler/src/i18n/digest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TitleComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = fixture.debugElement.query(By.directive(TitleComponent));
    expect(title.nativeElement).toBeTruthy();
  });


});
