import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent implements OnInit {
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
  survey_id: any;
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(queryParams => {
      this.user_id = queryParams['userId'];
      this.survey_id = queryParams['id'];
    });
    this.surveyData.userId = this.user_id;
  }

  ngOnInit(): void {
    if (this.survey_id) {
      this.getSurveyDetails();
    }
  }

  getSurveyDetails() {
    const param = {
      'id': this.survey_id
    }
    this.apiService.getSurveyDetail(param).subscribe((response) => {
      this.surveyData = response;
    });
  }

  addQuestion(index: number) {
    this.surveyData.questionList.push({
      id: index + 2,
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
    if (!this.survey_id) {
      this.apiService.saveSurveyData(this.surveyData).subscribe((response) => {
        this.data = response;
        this.router.navigate(['/dashboard'], {
          queryParams: {
            userId: this.data.userId
          }
        });
      });
    } else {
      this.apiService.updateSurveyData(this.surveyData).subscribe((response) => {
        this.data = response;
        this.router.navigate(['/dashboard'], {
          queryParams: {
            userId: this.data.userId
          }
        });
      });
    }
  }

  setOptionsValue(index: any) {
    if (this.surveyData.questionList[index].questionType === 'FivePointScale') {
      this.surveyData.questionList[index].options = ['1', '2', '3', '4', '5'];
    }
  }

  trackByFn(index: number, item: any) {
    return index; // or item.id if you have one
  }

  cancel() {
    this.router.navigate(['/dashboard'], {
      queryParams: {
        userId: this.user_id
      }
    });
  }

}
