import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { LoginComponent } from './login/login.component'; // Import Login Component
import { HomeComponent } from './home/home.component'; // Import Home Component

export const routes: Routes = [
  { path: 'add-trip', component: AddTripComponent },
  { path: 'edit-trip', component: EditTripComponent },
  { path: 'login', component: LoginComponent }, // New Login Route
  { path: 'list-trips', component: TripListingComponent },
  { path: '', component: TripListingComponent, pathMatch: 'full' } // Changed default path to HomeComponent
];
