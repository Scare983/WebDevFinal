import { Component, OnInit } from '@angular/core';
import * as jquery from '../jquery.js';
import * as bootstrap from '../bootstrap.min.js';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['../bootstrap.min.css','../app.component.css']
})
export class HeadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
