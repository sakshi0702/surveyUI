import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Question {
  id: string;
  options: string[] | null;
  question: string;
  questionType: string;
}

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  formData: any;
  survey_id: any;
  formResponses: { [key: string]: any } = {}; // Object to store form responses

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.survey_id = params['id'];
    });
    this.apiService.getParticularSurvey(this.survey_id).subscribe(data => {
      this.formData = data;
    });
  }

  onScaleSelect(questionId: string, value: string): void {
    // Handle scale selection
    this.formResponses[questionId] = value; // Store the selected value in formResponses object
    document.querySelectorAll(`.five-point-scale button`).forEach(button => {
      button.classList.remove('selected');
    });
  
    // Add 'selected' class to the clicked button
    const selectedButton = document.querySelector(`.five-point-scale button[value="${value}"]`);
    if (selectedButton) {
      selectedButton.classList.add('selected');
    }
  }

  onSubmit(): void {
    // Handle form submission
    console.log('Form submitted');

    // Check if all fields are filled
    for (const question of this.formData.questionList) {
      const answer = this.formResponses[question.id];
      if (!answer) {
        alert(`Please fill in all fields.`);
        return;
      }
    }

    const answerList: { quesId: string; answer: any; }[] = [];
    this.formData.questionList.forEach((question: Question) => {
      const answer = this.formResponses[question.id];
      answerList.push({
        quesId: question.id,
        answer: answer
      });
    });

    console.log('Answer List:', answerList);
    this.apiService.submitSurveyAnswers(this.survey_id, answerList).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        // Handle response from the backend API as needed
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error from the backend API as needed
      }
    );

    // Redirect to the thank you page
    this.router.navigate(['/thankYou']);
  }
}
