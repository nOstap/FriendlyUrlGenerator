import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UrlGeneratorService } from '../services/url-generator.service';

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
    this.urlFormControl = new FormControl(null);
  }

  submitUrl(): void {
    this.urlGenerator.makeFriendlyUrl(this.urlFormControl.value).subscribe((response) => {
      this.urlFormControl.setValue(response);
    });
  }

}
