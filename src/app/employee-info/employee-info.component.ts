import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
import * as jquery from '../jquery.js';
import * as bootstrap from '../bootstrap.min.js';
import {ScheduleFormValues} from '../admin-set-schedule/ScheduleFormValues';
import {forEach} from '@angular/router/src/utils/collection';
import {stringify} from 'querystring';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-employee-info-changes',
  template: `    
    
    <div class="right_bar ">
      <div class="tab-content">
        <button mat-button color="primary">Primary</button>
          <table class="table table-bordered table-editable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee Type</th>
                  <th>Email</th>
                  <th>Employee Roles</th>
                  <th>Gender</th>
                  <th>UserName</th>
                  <th>Password</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let employee of arrayOfEmployees; let i = index">
                  <td>
                    {{employee.fName + " " + employee.lName}}
                  </td>
                  <td>
                    <mat-radio-group aria-label="Select an option" [(ngModel)]="employee.employeeType" [disabled]="!employee.isEditable">
                      <mat-radio-button value="manager">manager</mat-radio-button>
                      <mat-radio-button value="employee">employee</mat-radio-button>
                      <mat-radio-button value="admin">admin</mat-radio-button>
                    </mat-radio-group>
                  </td>
                  <td>
                    <input type="text" [(ngModel)]="employee.email" [disabled]="!employee.isEditable">
                  </td>
                  <td >{{employee.roleTrained}}</td>                 
                  <td>{{employee.gender}}</td>
                  <td>
                    <input type="text" [(ngModel)]="employee.userName" [disabled]="!employee.isEditable">
                  </td>
                  <td>
                    <input type="text" [(ngModel)]="employee.password" [disabled]="!employee.isEditable">
                  </td>
                  <td>
                    <button (click)="employee.isEditable=!employee.isEditable" *ngIf="!employee.isEditable"> Edit</button>
                    <div>
                    <button *ngIf="employee.isEditable" (click)="employee.isEditable=!employee.isEditable" (click)="saveToDataBase(i)"  > Save </button>
                      <span ng-messages="">this response should change:  Updated index {{i}}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      
    </div>


  









  `,
  styleUrls: ['../bootstrap.min.css', '../app.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  arrayOfEmployees = []//[ {fName:'Kevin0', lName: 'Linnane', employeeType: 'admin', email:'kevin@gmail.com', roleTrained: [0, 1, 2], gender:"M", userName:"Kev", password:"123" },{fName:'Kevin1', lName: 'Linnane', employeeType: 'admin', email:'kevin@gmail.com', roleTrained:[0, 1, 2], gender:"M", userName:"Kev", password:"123"} ];
  arrayOfEmployee =[] ;//=  {fName:, lName:, employeeType:, email:, roleTrained:, gender:, userName:, password:};

  array = [];
  private serverURL = 'http://localhost:3000/employee-info';


  constructor(private http: HttpClient) { }
  ngOnInit() {
      fetch(this.serverURL).then(response => {
        return response.json();
      }).then(myJson => {
        this.array.push(myJson);
        /*for (var id in myJson) {
          var newObj = {};
          if ( myJson.hasOwnProperty(id)) {
            newObj = {id: myJson[id] };
            this.array.push(newObj);
          }
        }*/
          for(var i = 0; i <this.array[0].length;i++ ) {
            this.arrayOfEmployees.push(this.array[0][i]);
          }
          console.log(this.arrayOfEmployees);




      });

   //console.log(this.arrayOfValues);
  }

  saveToDataBase(i) {
    //check database info of employee and if info is different, call the update functions.
   // if(this.arrayOfEmployees[i].employeeType != )

  }
}
