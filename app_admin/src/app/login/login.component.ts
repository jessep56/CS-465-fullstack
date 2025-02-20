import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import this
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add this
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    console.log('LoginComponent loaded');
  }

  public onLoginSubmit(): void {  // Remove evt parameter
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    this.authenticationService.login(this.credentials)
      .then(() => this.router.navigateByUrl('#'))
      .catch((message) => this.formError = message);
  }
}
