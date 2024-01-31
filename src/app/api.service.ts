import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8100';

  constructor(private http: HttpClient) { }

  sendMailData(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  getAllCreatedSurveys(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-survey/` + param.id);
  }

  saveSurveyData(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-survey`, body);
  }

  getReportData(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/report/` + param.id);
  }

  updateSurveyData(body: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit-survey`, body);
  }

  getSurveyDetail(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-particular-survey/` + param.id);
  }

  addCollaborator(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/invite-collaborator`, '', {
      params: payload
    });
  }

  getActiveSurveys(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/active-surveys/` + param.id);
  }

  getCompletedSurveys(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/completed-surveys/` + param.id);
  }

  getColaboratedSurveys(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-collaborated-survey/` + param.id);
  }

  getParticularSurvey(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-particular-survey/` + param); // param will only have survey id
  }

  submitSurveyAnswers(surveyId: string, answerList: any[]): Observable<any> {
    const body = {
      surveyId: surveyId,
      answerList: answerList
    };
    return this.http.post(`${this.apiUrl}/answer/${surveyId}`, body);
  }
}
