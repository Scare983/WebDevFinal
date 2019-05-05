import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ScheduleFormValues } from './ScheduleFormValues';
import * as jquery from '../jquery.js';
import * as bootstrap from '../bootstrap.min.js';

const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-admin-set-schedule',
  templateUrl: './admin-set-schedule.component.html',
  styleUrls: ['../bootstrap.min.css','../app.component.css']
})

export class AdminSetScheduleComponent implements OnInit {

  private serverURL = 'http://127.0.0.1:3000/admin-set-schedule';

  vals: ScheduleFormValues;

  constructor(private http: HttpClient, private location: Location, private router: Router) { }

  ngOnInit() {
    this.vals = new ScheduleFormValues();
  }

  string2Date(): void{

  	this.vals.dateDates[0] = new Date(this.vals.dateStrings[0]);
	this.vals.dateDates[0].setDate(this.vals.dateDates[0].getDate()+1); //This line is here bc when I select date on bootstrap calendar it returns day - 1

	for (var i=1; i < 7; i++){
	    this.vals.dateDates[i] = new Date(this.vals.dateDates[0]);
	    this.vals.dateDates[i].setDate(this.vals.dateDates[0].getDate()+i);
	    this.vals.dateStrings[i] = this.vals.dateDates[i].toString();
	    this.vals.dateStrings[i] = this.vals.dateStrings[i].substr(0,15);
	  }

	  this.vals.dateStrings[0] = this.vals.dateDates[0].toString();
	  this.vals.dateStrings[0] = this.vals.dateStrings[0].substr(0,15);

	  console.log("dateStrings[0]: ", this.vals.dateStrings[0]);
	  console.log("dateStrings[5]: ", this.vals.dateStrings[5]);

  }

  onSubmit(){

    var valsJSON = JSON.stringify(this.vals);

    this.http.post<ScheduleFormValues>(this.serverURL, valsJSON, httpOptions)
        .subscribe(msg => console.log(msg));

    this.router.navigateByUrl('/admin-view-schedule');

    console.log("still here");

    /*this.http.post<ScheduleFormValues>(this.serverURL, this.vals, httpOptions)
        .subscribe(msg => console.log(msg));
    */
  }

}
