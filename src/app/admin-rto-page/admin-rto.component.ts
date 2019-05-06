import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-employee-rto',
  template: `
    <div *ngIf="arrayOfEmployeesRTO.length > 0" class="right_bar">

      <div class="tab-content">
        <table class="table table-bordered table-editable table-striped ml-1 ">
        <thead class ="thead-dark">
           <tr>
             <th>Name</th>
             <th>Requested Off Start Date</th>
             <th>Requested Off End Date</th>
             <th>Reason</th>
             <th></th>
           </tr>
        </thead>
        <tbody >
          <tr *ngFor="let employee of arrayOfEmployeesRTO; let i = index">
            <td>
         {{employee.fName + " " + employee.lName}}
            </td>
            <td>
              {{employee.reqOffStart}}
            </td>
            <td>
             {{employee.reqOffEnd}}
            </td>
            <td>
              {{employee.reason}}
            </td>
            <td>
              <button (click)="onClickMeAccept(i)"> Accept</button>
              <button (click)="onClickMeDeny(i)"> Deny</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
     </div>
  <div *ngIf="arrayOfEmployeesRTO.length == 0" class="right_bar">
    <h1>No one is looking for a day off.</h1>
  </div>
  `,
  styleUrls: ['../bootstrap.min.css', '../app.component.css']
})

export class AdminRtoComponent implements  OnInit {
  private serverURL = 'http://localhost:3000/admin-rto';
    arrayOfEmployeesRTO = [];//methodThat gets array of employees
  array = [];
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    fetch(this.serverURL).then(response => {
      return response.json();
    }).then(myJson => {

      //let i = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();


      this.array.push(myJson);

      for (var i = 0; i < this.array[0].length; i++) {
        this.arrayOfEmployeesRTO.push(this.array[0][i]);
      }
 //     console.log(this.arrayOfEmployeesRTO["reqOffStart"]);
    });
    //console.log(this.arrayOfValues);
  }

  onClickMeAccept(i: number) {
    if(confirm('Are you sure you want to Accept the request for: \n' + this.arrayOfEmployeesRTO[i].fName + " " + this.arrayOfEmployeesRTO[i].lName + " from \n" + this.arrayOfEmployeesRTO[i].reqOffStart + "\n to \n" + this.arrayOfEmployeesRTO[i].reqOffEnd)) {
      this.arrayOfEmployeesRTO[i].response ="accepted";
      let valsJSON = JSON.stringify(this.arrayOfEmployeesRTO[i]);
      let goToLocation = 'http://localhost:3000/admin-rto/update';
      this.http.post(goToLocation, valsJSON, httpOptions)
        .subscribe(msg => console.log(msg));
      window.location.reload();
    }
    else {

    }
  }
  onClickMeDeny(i: number) {
    console.log(this.arrayOfEmployeesRTO[i]);
    if(confirm('Are you sure you want to Deny the request for: \n' + this.arrayOfEmployeesRTO[i].fName + " " + this.arrayOfEmployeesRTO[i].lName + " from \n" + this.arrayOfEmployeesRTO[i].reqOffStart + "\n to \n" + this.arrayOfEmployeesRTO[i].reqOffEnd)) {
      this.arrayOfEmployeesRTO[i].response ="denied";
      let valsJSON = JSON.stringify(this.arrayOfEmployeesRTO[i]);

      let goToLocation = 'http://localhost:3000/admin-rto/update';
      this.http.post(goToLocation, valsJSON, httpOptions)
        .subscribe(msg => console.log(msg));
      window.location.reload();
    }
    else {
    }
  }
}
