import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule,HttpClientJsonpModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadingComponent } from './heading/heading.component';
import { AdminSetScheduleComponent } from './admin-set-schedule/admin-set-schedule.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RequestOffPageComponent } from './request-off-page/request-off-page.component';
import { AdminViewScheduleComponent } from './admin-view-schedule/admin-view-schedule.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import {AdminRtoComponent} from './admin-rto-page/admin-rto.component';
import {MatRadioModule} from '@angular/material/radio';
import { FarenheihtPipe } from './farenheiht.pipe';
import { MomentPipe } from './moment.pipe';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    AdminSetScheduleComponent,
    LoginPageComponent,
    RequestOffPageComponent,
    AdminViewScheduleComponent,
    EmployeeInfoComponent,
    AdminRtoComponent,
    FarenheihtPipe,
    MomentPipe,
    AddUserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    HttpClientJsonpModule,
  ],
  exports: [MatRadioModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
