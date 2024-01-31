import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { ReportsComponent } from './reports/reports.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { SubmissionComponent } from './submission/submission.component';
import { ThankYouComponent } from './thank-you/thank-you.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/form', component: NewSurveyComponent },
  { path: '', component: LoginComponent },
  { path: 'report', component: ReportsComponent },
  { path: 'view', component: ViewSurveyComponent },
  { path: 'submission/:id', component: SubmissionComponent },
  { path: 'thankYou', component: ThankYouComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
