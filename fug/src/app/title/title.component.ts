import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fug-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  public readonly title = 'Friendly Url Generator';

  constructor() { }

  ngOnInit(): void {
  }

}
