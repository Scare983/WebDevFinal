import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadingComponent } from './heading/heading.component';
import { AdminSetScheduleComponent } from './admin-set-schedule/admin-set-schedule.component';
import { RequestOffPageComponent} from './request-off-page/request-off-page.component';
import { AdminViewScheduleComponent } from './admin-view-schedule/admin-view-schedule.component';
import { EmployeeInfoComponent} from './employee-info/employee-info.component';
import {AdminRtoComponent} from './admin-rto-page/admin-rto.component';
import { AddUserModalComponent} from './add-user-modal/add-user-modal.component'

const routes: Routes = [
  {path: '', redirectTo: 'admin-view-schedule', pathMatch: "full" },
  {path: 'heading', component: HeadingComponent},
  {path: 'admin-set-schedule', component: AdminSetScheduleComponent},
  {path: 'request-off-page', component: RequestOffPageComponent},
  {path: 'admin-view-schedule', component: AdminViewScheduleComponent},
  {path: 'employee-info', component: EmployeeInfoComponent},
  {path: 'admin-rto-page', component: AdminRtoComponent},
  {path: 'add-user-modal', component: AddUserModalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
