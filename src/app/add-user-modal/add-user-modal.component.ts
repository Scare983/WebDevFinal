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
    "fName:": "",
    "lName": "",
    "email":"",
    "userName": "",
    "password": "",
    "password-repeat": "",
    "gender": "",
    "roles": ""
    
  };

  }
  ngOnInit() {
    
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


