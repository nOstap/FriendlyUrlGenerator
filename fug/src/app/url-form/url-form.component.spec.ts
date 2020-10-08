import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, Subscriber } from 'rxjs';
import { UrlGeneratorService } from '../services/url-generator.service';
import { UrlFormComponent } from './url-form.component';
jest.mock('../services/url-generator.service');


describe('UrlFormComponent', () => {
  let component: UrlFormComponent;
  let fixture: ComponentFixture<UrlFormComponent>;
  let urlGenerator: UrlGeneratorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        UrlGeneratorService
      ],
      declarations: [UrlFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    fixture = TestBed.createComponent(UrlFormComponent);
    component = fixture.componentInstance;
    urlGenerator = TestBed.inject(UrlGeneratorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' form field', () => {
    const urlForm = fixture.debugElement.query(By.directive(MatFormField));

    expect(urlForm).toBeTruthy();
    expect(urlForm.attributes.appearance).toEqual('fill');
  });

  it('display form field label', () => {
    const urlFieldLabel = fixture.debugElement.query(By.directive(MatFormField)).query(By.directive(MatLabel));

    expect(urlFieldLabel.nativeElement.textContent).toEqual(component.labelText);
  });

  it('display input field', () => {
    const inputField = fixture.debugElement.query(By.directive(MatFormField)).query(By.directive(MatInput));

    expect(inputField).toBeTruthy();
  });

  it('display submit button', () => {
    const button = fixture.debugElement.query(By.css('[mat-flat-button]'));

    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toEqual(component.submitButtonText);
    expect(button.attributes.color).toEqual('primary');
  });

  describe('Generate button clickm', () => {
    it('submits provided long url', () => {
      const button = fixture.debugElement.query(By.css('[mat-flat-button]'));
      const submitUrlSpy = jest.spyOn(component, 'submitUrl');
      const makeFriendlyUrlSpy = jest.spyOn(urlGenerator, 'makeFriendlyUrl');
      component.urlFormControl.setValue('foo.co.uk');

      button.nativeElement.click();

      expect(submitUrlSpy).toHaveBeenCalledTimes(1);
      expect(makeFriendlyUrlSpy).toHaveBeenCalledTimes(1);
      expect(makeFriendlyUrlSpy).toHaveBeenCalledWith(component.urlFormControl.value);
    });

    it('display generated url inside input field', () => {
      const friendlyUrl$ = new Observable<string>(sub => {
        sub.next('friendlyUrl');
        sub.complete();
      });
      const inputField = fixture.debugElement.query(By.directive(MatFormField)).query(By.directive(MatInput));
      jest.spyOn(urlGenerator, 'makeFriendlyUrl').mockReturnValue(friendlyUrl$);
      component.urlFormControl.setValue('foo.co.uk');

      component.submitUrl();
      fixture.detectChanges();

      expect(inputField.nativeElement.value).toEqual('friendlyUrl');
    });

    test.each([
      [''],
      ['invalid@format'],
      ['invalid']
    ])('submitting %s url takes no action', (url) => {
      const makeFriendlyUrlSpy = jest.spyOn(urlGenerator, 'makeFriendlyUrl');

      component.submitUrl();

      expect(makeFriendlyUrlSpy).not.toHaveBeenCalled();
    });

    it('disables the button while generating a url', () => {
      let sub: Subscriber<string>;
      const friendlyUrl$ = new Observable<string>(s => sub = s);
      const button = fixture.debugElement.query(By.css('[mat-flat-button]'));
      jest.spyOn(urlGenerator, 'makeFriendlyUrl').mockReturnValue(friendlyUrl$);
      component.urlFormControl.setValue('foo.co.uk');

      expect(button.nativeElement.disabled).toEqual(false);

      button.nativeElement.click();
      fixture.detectChanges();

      expect(button.nativeElement.disabled).toEqual(true);

      sub.next('friendlyUrl');
      sub.complete();
      fixture.detectChanges();

      expect(button.nativeElement.disabled).toEqual(false);
    });

  });

});

