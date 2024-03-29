import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportsComponent } from './reports/reports.component';
import { ListComponent } from './list/list.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { DatePipe } from '@angular/common';
import { SubmissionComponent } from './submission/submission.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ErrorComponent,
    NavbarComponent,
    NewSurveyComponent,
    ReportsComponent,
    ListComponent,
    PiechartComponent,
    ViewSurveyComponent,
    SubmissionComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
