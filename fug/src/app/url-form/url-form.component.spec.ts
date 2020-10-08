import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { UrlFormComponent } from './url-form.component';


describe('UrlFormComponent', () => {
  let component: UrlFormComponent;
  let fixture: ComponentFixture<UrlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      declarations: [UrlFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    fixture = TestBed.createComponent(UrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('display form field', () => {
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

  describe('Generate Url Button', () => {
    it('display', () => {
      const button = fixture.debugElement.query(By.css('[mat-flat-button]'));

      expect(button).toBeTruthy();
      expect(button.nativeElement.textContent).toEqual(component.submitButtonText);
      expect(button.attributes.color).toEqual('primary');
    });

    it('clicks', () => {
      const button = fixture.debugElement.query(By.css('[mat-flat-button]'));
      const submitUrlSpy = jest.spyOn(component, 'submitUrl');

      button.nativeElement.click();

      expect(submitUrlSpy).toHaveBeenCalledTimes(1);
    });

  });




});
