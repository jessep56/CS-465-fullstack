import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';  
import { AuthenticationService } from '../services/authentication.service';  // Added for authentication check

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService, 
    private router: Router, 
    private authenticationService: AuthenticationService  // Inject AuthenticationService
  ) {  
    console.log('trip-listing constructor');
  }

  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  public addTrip(): void {   
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {   // Added authentication check
    return this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
