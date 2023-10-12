import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyEmployeeFormComponent } from "./components/my-employee-form/my-employee-form.component";
import { MyEmployeeEntriesListComponent } from "./components/my-employee-entries-list/my-employee-entries-list.component";
import {
  MyEmployeeEntryValidateComponent
} from "./components/my-employee-entry-validate/my-employee-entry-validate.component";

const routes: Routes = [
  {path: ':employeeName/registrar', component: MyEmployeeFormComponent},
  {path: 'registros', component: MyEmployeeEntriesListComponent},
  {path: ':employeeName/validar', component: MyEmployeeEntryValidateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
