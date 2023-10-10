import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyEmployeeFormComponent} from "./components/my-employee-form/my-employee-form.component";

const routes: Routes = [
  {path: ":employeeName/registrar", component: MyEmployeeFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
