import { fingerprint } from '@angular/compiler/src/i18n/digest';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { UrlFormComponent } from './url-form/url-form.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TitleComponent,
        UrlFormComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('displays title', () => {
    const title = fixture.debugElement.query(By.directive(TitleComponent));

    expect(title).toBeTruthy();
  });

  it('displays url form', () => {
    const urlForm = fixture.debugElement.query(By.directive(UrlFormComponent));

    expect(urlForm).toBeTruthy();
  });


});
