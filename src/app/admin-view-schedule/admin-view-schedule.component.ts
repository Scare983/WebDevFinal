import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { SchedulerService } from '../scheduler.service'
import * as jquery from '../jquery.js';
import * as bootstrap from '../bootstrap.min.js';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-admin-view-schedule',
  templateUrl: './admin-view-schedule.component.html',
  styleUrls: ['../bootstrap.min.css','../app.component.css']
})
export class AdminViewScheduleComponent implements OnInit {

  private serverURL = 'http://127.0.0.1:3000/';
  public weather: any;

  constructor(private http: HttpClient, private schedulerService: SchedulerService) {
    this.weather = [];
   }

  ngOnInit() {
    this.getWeather();
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

}
