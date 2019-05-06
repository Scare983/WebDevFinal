import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ScheduleFormValues } from './ScheduleFormValues';
import { SchedulerService } from '../scheduler.service';
import { Scheduler } from '../../../backend/Scheduler.js';
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


   vals: ScheduleFormValues;
  private serverURL = 'http://127.0.0.1:3000/admin-set-schedule';
  private appID: string;
  private appCode: string;
  public weather: any;



  constructor(private http: HttpClient, private location: Location, private router: Router, private schedulerService: SchedulerService) {
  this.appID = 'M8eqbw9k0GtE64wKK8Pk';
    this.appCode = '07gzPxQWuIT7eF_wlfFAtw';
    this.weather = [];
	}




  ngOnInit() {
    this.getWeather();
    this.vals = new ScheduleFormValues();
  }

  public getWeather(){

    this.http.jsonp("https://weather.api.here.com/weather/1.0/report.json?app_id=M8eqbw9k0GtE64wKK8Pk&app_code=07gzPxQWuIT7eF_wlfFAtw&product=forecast_7days_simple&latitude=33.95&longitude=-83.37", "jsonpCallback")
    .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
    .subscribe(result => {
        this.weather = result.forecast;
    }, error => {
        console.error(error);
    });

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

 onSubmit(schedulerService: SchedulerService){

    var valsJSON = JSON.stringify(this.vals);

    this.http.post<string>(this.serverURL, valsJSON, httpOptions)
        .subscribe(function(msg){
	  schedulerService.setHtmlTableString(msg);
        });

    this.router.navigateByUrl('/admin-view-schedule');

    console.log("still here");

  }

}
