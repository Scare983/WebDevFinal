import {Component} from '@angular/core';
@Component({
  selector: 'app-employee-rto',
  template: `
    <div class="right_bar">
      <h2>List of Employees Who have Requested Times Off</h2>
      <div class="tab-content ">
        
      <table class="table table-bordered">
        <thead>
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
              Name {{employee}}
            </td>
            <td>
              Requested Off Start Date {{employee}}
            </td>
            <td>
              Requested Off End Date {{employee}}
            </td>
            <td>
              Reason
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
  `,
  styleUrls: ['../bootstrap.min.css','../app.component.css']
})
export class AdminRtoComponent {
  user = 'kevin';
    arrayOfEmployeesRTO = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];//methodThat gets array of employees
    getEmployeeFName() {
     // return this.arrayOfEmployeesRTO.fName;
    }
    getEmployeeLname() {
    //  return this.arrayOfEmployeesRTO
    }
  onClickMeAccept(i: number) {
    if(confirm('Are you sure to Accept the request for:' + i)) {
      console.log('Change the database');
    }
    else {

    }
  }
  onClickMeDeny(i: number) {
    if(confirm('Are you sure to Deny the request for:' + i)) {
      console.log('Change the database');
    }
    else {

    }
  }

}
