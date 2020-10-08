import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { UrlGeneratorService } from '../services/url-generator.service';
import { URL_REGEXP } from '../constants';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'fug-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent implements OnInit {
  urlFormControl: FormControl;
  labelText = 'Paste long url and generate friendly one';
  readonly submitButtonText = 'Generate';
  @ViewChild('submitButton') submitButton: HTMLButtonElement;

  constructor(private readonly urlGenerator: UrlGeneratorService) { }

  ngOnInit(): void {
    this.urlFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(URL_REGEXP),
    ]);
  }

  submitUrl(): void {
    if (this.urlFormControl.invalid) {
      return;
    }

    this.submitButton.disabled = true;

    this.urlGenerator.makeFriendlyUrl(this.urlFormControl.value).subscribe({
      next: (response) => {
        this.urlFormControl.setValue(response);
        this.submitButton.disabled = false;
      },
      error: () => {
        this.submitButton.disabled = false;
      },
    });
  }

}
