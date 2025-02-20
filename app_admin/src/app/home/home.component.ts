import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this
import { AuthenticationService } from '../services/authentication.service'; // Import this

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Already added, so no changes here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authenticationService: AuthenticationService) { } // Add this

  public isLoggedIn(): boolean { // Add this function
    return this.authenticationService.isLoggedIn();
  }
}
