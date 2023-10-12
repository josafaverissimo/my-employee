import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyEmployeeFormComponent } from './components/my-employee-form/my-employee-form.component';
import { MyTableComponent } from './components/my-table/my-table.component';
import { MyEmployeeEntriesListComponent } from './components/my-employee-entries-list/my-employee-entries-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MyEmployeeFormComponent,
    MyTableComponent,
    MyEmployeeEntriesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxMaskPipe,
    AppRoutingModule
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
