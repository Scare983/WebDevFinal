# AngularDawgsAtTee

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

Our backend runs on localhost:3000 using NodeJS.  This is our DB connector and processor of requests.  
What is in this file is the IMPLEMENTATION of the ADMIN side of the the golf course schedule generator.  
ANGULAR JS frontend with some bootstrap css.  
view-schedule page is populated from generate-schedule.  In which case a csv file is generated for users to look at on their system.
Tried to format a table with this csv to display onto the admin-view-schedule page, however there were errors on this portion.  

Employee-info page shows all current employees with easy access to remove them from the scheduling process (in case of fired, or incative)
New user button will also add credentials to the database and automatically will start to schedule them based on their preferences.  
On addition of new employee, to see the change, need to refresh the page.  

Requested TIme off will be populated from the employee side implmentation of this web site, however for now, SQL inserted into the table, and
on delete of employee from employee-info does a cascding delete and they will be removed from this requestedOff display if they ever had any PENDING requests
Admin can accept or deny a request which will remove them from the requested time off page.  

Weather API is in top of generate Schedule and view schedule for admin to choose what how many employees wanted per day (in case it is going to rain, may schedule less people)

Generate schedule page gives admin power to change default algorithm of what sort of shifts are needed per day and if need more employees than typical amount. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


