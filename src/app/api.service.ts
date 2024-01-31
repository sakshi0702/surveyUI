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

  getSurveyDetail(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-particular-survey/` + param.id);
  }

  getActiveSurveys(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/active-surveys/` + param.id + '/' + param.dateAndTime);
  }

  getCompletedSurveys(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/completed-surveys/` + param.id + '/' + param.dateAndTime);
  }

  getColaboratedSurveys(param: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-collaborated-survey/` + param.id);
  }
}