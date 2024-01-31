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

}
