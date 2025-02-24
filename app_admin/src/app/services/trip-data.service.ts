import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}trips`);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}trips`, formData);
  }

  getTripByCode(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}trips/${tripCode}`);
  }

  updateTrip(tripCode: string, formData: Trip): Observable<Trip> {
    const token = this.storage.getItem('travlr-token'); // Retrieve token from storage
    const headers = { Authorization: `Bearer ${token}` };
  
    return this.http.put<Trip>(`${this.apiBaseUrl}trips/${tripCode}`, formData, { headers });
  }
  
  // Authentication API calls
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url = `${this.apiBaseUrl}${urlPath}`;
    return this.http.post<AuthResponse>(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something went wrong:', error);
    return Promise.reject(error.message || error);
  }
}
