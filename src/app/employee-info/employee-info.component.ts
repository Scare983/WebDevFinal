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

import { FormGroup, FormControl, Validators } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-employee-info-changes',
  template: `

    <div>
   
          <table class="table table-bordered table-editable table-striped ml-1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee Type</th>
                  <th>Email</th>
                  <th>Employee Roles</th>
                  <th>Gender</th>
                  <th>UserName</th>
                  <th>Password</th>
                  <th>pref#shifts</th>
                  <th><button type="button" class="btn btn-primary" (click)="newUser()">Add User </button></th>
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
                    <input type="number" [(ngModel)]="employee.prefNumOfShifts" [disabled]="!employee.isEditable">
                  </td>
             
                  <td>
                    <button (click)="employee.isEditable=!employee.isEditable" *ngIf="!employee.isEditable"> Edit</button>
                    <div *ngIf="employee.isEditable">
                      <div class="font-small">
                       <button   class = "butSize" (click)="employee.isEditable=!employee.isEditable" (click)="saveToDataBase(i)"  > <i class=" fa fa-save fa-l  saveID"></i> </button>
                      </div>
                      <div class=" font-small">
                        <button class = "butSize" (click)="employee.isEditable=!employee.isEditable" (click)="deleteUser(i)"  > <i class=" fa fa-trash fa-l  deleteId"></i> </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

      <form #companyForm="ngForm" (ngSubmit)="submitCompany(companyForm.form);">
        <button class="btn btn-primary" [disabled]="!companyForm.valid">Submit</button>
        <input type="text"
               class="form-control"
               name="company-name"
               ngModel
               #nameField="ngModel"
               minlength="3"
        >  <div class="alert alert-danger"
    
        <div class="alert alert-danger"
             *ngIf="nameField.errors.minlength">
          The company name is required
        </div>
    
    
  
      </form>
      
      </div>
      



  









  `,
  styleUrls: ['../bootstrap.min.css', '../app.component.css']
})

export class EmployeeInfoComponent implements OnInit {
  arrayOfEmployees = []//[ {fName:'Kevin0', lName: 'Linnane', employeeType: 'admin', email:'kevin@gmail.com', roleTrained: [0, 1, 2], gender:"M", userName:"Kev", password:"123" },{fName:'Kevin1', lName: 'Linnane', employeeType: 'admin', email:'kevin@gmail.com', roleTrained:[0, 1, 2], gender:"M", userName:"Kev", password:"123"} ];
   //=  {fName:, lName:, employeeType:, email:, roleTrained:, gender:, userName:, password:};
  array = [];
  private serverURL = 'http://localhost:3000/employee-info';


  constructor(private http: HttpClient) {
  }
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
          for(var i = 0; i < this.array[0].length;i++ ) {
            this.arrayOfEmployees.push(this.array[0][i]);
          }

      });

   //console.log(this.arrayOfValues);
  }
  submitCompany(form){
    console.log(form.value);
    alert("The form was submitted");
    form.reset();
  }
  saveToDataBase(i) {
    // this is going to be inefficient because i cant seem to get a comparison array from Ngint, so if save is clicked,  we are going to update entire DB row.
    let valsJSON = JSON.stringify(this.arrayOfEmployees[i]);
    console.log(valsJSON);
    let goToLocation = 'http://localhost:3000/employee-info/update-emp-info';
    this.http.post(goToLocation, valsJSON, httpOptions)
      .subscribe(msg => console.log(msg));
    //check database info of employee and if info is different, call the update functions.
   // if(this.arrayOfEmployees[i].employeeType != )
  }
  deleteUser(i) {
    if (confirm('Are you sure you want to delete ' + this.arrayOfEmployees[i].fName + ' ' +  this.arrayOfEmployees[i].lName + '?')) {
      let valsJSON = JSON.stringify(this.arrayOfEmployees[i]);
      let goToLocation = 'http://localhost:3000/employee-info/delete-emp-info';
      this.http.post(goToLocation, valsJSON, httpOptions)
        .subscribe(msg => console.log(msg));
      window.location.reload();
    } else {
      return false;
    }

  }
}
