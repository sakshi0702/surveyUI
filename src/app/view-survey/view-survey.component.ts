import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {
  survey_id: any;
  data: any;
  collaboratorEmail: string = ''; 
  permissionType: string = 'Edit';
  collaboratorAddedMessage!: string;
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.survey_id = queryParams['id'];
    });
    this.getSurveyDetail();
  }

  getSurveyDetail() {
    const param = {
      'id': this.survey_id
    }
    this.apiService.getSurveyDetail(param).subscribe((response) => {
      this.data = response;
    });
  }

  addCollaborator() {
    if (this.collaboratorEmail) {

      const payload = {
        'email': this.collaboratorEmail,
        'surveyId': this.survey_id,
        'permissionType': this.permissionType
      };
      this.apiService.addCollaborator(payload).subscribe((response) => {

        console.log('Collaborator added:', response);
        if (response === "User Not Found! ") {
          this.collaboratorAddedMessage = 'User Not Found.';
          console.log(this.collaboratorAddedMessage);
        }
        window.location.reload();
      });
     
    } else {
      console.error('Email is required.');
    }
  }

}
