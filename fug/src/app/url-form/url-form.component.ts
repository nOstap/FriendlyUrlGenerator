import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { UrlGeneratorService } from '../services/url-generator.service';
import { URL_REGEXP } from '../constants';

@Component({
  selector: 'fug-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent implements OnInit {
  urlFormControl: FormControl;
  readonly labelText = 'Paste long url and generate friendly one';
  readonly submitButtonText = 'Generate';

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

    this.urlGenerator.makeFriendlyUrl(this.urlFormControl.value).subscribe((response) => {
      this.urlFormControl.setValue(response);
    });
  }

}
