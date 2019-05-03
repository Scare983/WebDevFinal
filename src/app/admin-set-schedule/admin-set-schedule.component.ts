import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
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

  private serverURL = 'http://127.0.0.1:3000/';

  vals: ScheduleFormValues;


  dateStrings: string [] = [];
  dateDates: Date[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.vals = new ScheduleFormValues();
  }

  string2Date(): void{
  	this.dateDates[0] = new Date(this.dateStrings[0]);
	  this.dateDates[0].setDate(this.dateDates[0].getDate()+1); //This line is here bc when I select date on bootstrap calendar it returns day - 1

  	for (var i=1; i < 7; i++){
	    this.dateDates[i] = new Date(this.dateDates[0]);
	    this.dateDates[i].setDate(this.dateDates[0].getDate()+i);
	    this.dateStrings[i] = this.dateDates[i].toString();
	    this.dateStrings[i] = this.dateStrings[i].substr(0,15);
	  }

	  this.dateStrings[0] = this.dateDates[0].toString();
	  this.dateStrings[0] = this.dateStrings[0].substr(0,15);

	  console.log("dateStrings[0]: ", this.dateStrings[0]);
	  console.log("dateStrings[5]: ", this.dateStrings[5]);
  }

  onSubmit(){

    var valsJSON = JSON.stringify(this.vals);

    this.http.post<ScheduleFormValues>(this.serverURL, valsJSON, httpOptions)
        .subscribe(msg => console.log(msg));

    /*this.http.post<ScheduleFormValues>(this.serverURL, this.vals, httpOptions)
        .subscribe(msg => console.log(msg));
    */
  }

}
