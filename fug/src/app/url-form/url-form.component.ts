import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fug-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent implements OnInit {
  urlFormControl: FormControl;
  readonly labelText = 'Paste long url and generate friendly one';
  readonly submitButtonText = 'Generate';

  constructor() { }

  ngOnInit(): void {
    this.urlFormControl = new FormControl(null);
  }

  submitUrl(): void {
    throw new Error('Method not implemented.');
  }

}
