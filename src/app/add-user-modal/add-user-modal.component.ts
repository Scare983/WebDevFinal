import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css','../bootstrap.min.css','../app.component.css']
})
export class AddUserModalComponent implements OnInit {
 
  public input: any;

  constructor(private http: HttpClient, private router: Router) { 
  this.input = {
    fName: "",
    lName: "",
    email:"",
    userName: "",
    password: "",
    employeeType: "",
    password_repeat: "",
    gender: "",
    roles: []
  };
  }
  ngOnInit() {
    
  }

  onSubmit() {
    this.input.fName= this.input.fName.toLowerCase();
    this.input.lName= this.input.lName.toLowerCase();
    let i = [];
    if(this.input.roles[0] == true) {
      i.push('S');

    }

    if(this.input.roles[1] == true)  {

      i.push('R');
    }

    if(this.input.roles[2] == true) {
      this.input.roles[2] = 'C' ;
      i.push('C');
    }

    if(this.input.roles[3] == true) {

      i.push('RR');
    }
    if(this.input.roles[4] == true) {
      i.push('ST');
    }

    this.input.roles = i;


    let valsJSON = this.input;
    console.log(valsJSON.roles);
    let goToLocation = 'http://localhost:3000/add-user/';
    this.http.post(goToLocation, valsJSON, httpOptions)
      .subscribe(msg => console.log(msg));
    this.router.navigate(['/employee-info']);


  }
/*
  public register() {
    if(this.input.email && this.input.password) {
        let headers = new Headers({ "content-type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:3000/account", JSON.stringify(this.input), options)
            .map(result => result.json())
            .subscribe(result => {
                this.router.navigate(["/login"]);
            });
    }
    */
}


