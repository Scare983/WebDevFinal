import { Injectable } from '@angular/core';
import { AdminSetScheduleComponent } from './admin-set-schedule/admin-set-schedule.component'

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

       htmlTableString:string = '';

  constructor() {
  		console.log("serve is here");
  }

  setHtmlTableString(htmlTableString:string){
	this.htmlTableString = JSON.stringify(htmlTableString);

	var pos1 = this.htmlTableString.indexOf(':') + 2;
	var pos2 = this.htmlTableString.lastIndexOf('"');
	this.htmlTableString = this.htmlTableString.substring(pos1,pos2);
	
	console.log("set string");
	console.log(this.htmlTableString);

	
  }
}
