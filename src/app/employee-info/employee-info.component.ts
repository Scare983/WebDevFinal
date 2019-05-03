import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as jquery from '../jquery.js';
import * as bootstrap from '../bootstrap.min.js';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-employee-info-changes',
  template: `    
    <div class="right_bar ">
      <div class="tab-content ">
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
export class EmployeeInfoComponent {
  arrayOfEmployees = [ {fName:'Kevin0', lName: 'Linnane', employeeType: 'admin', email:'kevin@gmail.com', roleTrained: [0, 1, 2], gender:"M", userName:"Kev", password:"123" },{fName:'Kevin1', lName: 'Linnane', employeeType: 'admin', email:'kevin@gmail.com', roleTrained:[0, 1, 2], gender:"M", userName:"Kev", password:"123"} ];
  private serverURL = 'http://127.0.0.1:3000/';
output;
  constructor(private http: HttpClient) { }

  saveToDataBase(i) {
    //check database info of employee and if info is different, call the update functions.
   // if(this.arrayOfEmployees[i].employeeType != )
    this.output = "saved to index " + i;
  }
}
