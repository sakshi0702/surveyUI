declare var google: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any;
  constructor(private router: Router,
    private apiService: ApiService) { }
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '498156136472-ns33c0rugak9oehs21c98568kblcfmhq.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.handleLogin(resp);
      }
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: '280'
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const responsePayload = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(responsePayload));
      const query_params = {
        email: responsePayload.email
      }
      this.apiService.sendMailData(query_params).subscribe((response) => {
        this.data = response;
        this.router.navigate(['/dashboard'], {
          queryParams: {
            userId: this.data.id
          }
        });
      });
    }
  }

}
