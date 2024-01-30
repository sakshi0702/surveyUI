import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent {
  surveyData = {
    userId: '',
    name: '',
    startTime: '',
    endTime: '',
    questionList: [
      {
        id: 1,
        question: '',
        questionType: '',
        options: ['']
      }
    ],
    collaborators: []
  };
  data: any;
  user_id: any;
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(queryParams => {
      this.user_id = queryParams['userId'];
    });
    this.surveyData.userId = this.user_id;
  }

  addQuestion(index: number) {
    this.surveyData.questionList.push({
      id: index + 1,
      question: '',
      questionType: '',
      options: ['']
    });
  }

  removeQuestion(index: number) {
    this.surveyData.questionList.splice(index, 1);
  }

  addOption(question: any) {
    question.options.push('');
  }

  removeOption(question: any, index: number) {
    question.options.splice(index, 1);
  }

  submitForm() {
    console.log('Survey Data:', this.surveyData);
    this.apiService.saveSurveyData(this.surveyData).subscribe((response) => {
      this.data = response;
      this.router.navigate(['/dashboard'], {
        queryParams: {
          userId: this.data.userId
        }
      });
    });
  }

}
