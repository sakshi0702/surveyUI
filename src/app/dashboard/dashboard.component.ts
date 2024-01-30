import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user_id: any;
  data: any;
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.user_id = queryParams['userId'];
    });
    this.getSurveyList();
  }

  getSurveyList() {
    const param = {
      'id': this.user_id
    }
    this.apiService.getAllCreatedSurveys(param).subscribe((response) => {
      this.data = response;
    });
  }

  getActiveSurveyList() { }

  getCompletedSurveyList() { }

  createSurvey() {
    this.router.navigate(['/dashboard/form'], {
      queryParams: {
        userId: this.user_id
      }
    });
  }

}
