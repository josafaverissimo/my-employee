import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyEmployeeFormComponent } from './components/my-employee-form/my-employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MyEmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AppRoutingModule
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
