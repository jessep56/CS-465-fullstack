import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  // Retrieve token from local storage
  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  // Save token to local storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Login user and save JWT token
  public login(user: User): Promise<any> {
    return this.tripDataService.login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  // Register user and save JWT token
  public register(user: User): Promise<any> {
    return this.tripDataService.register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  // Logout user by removing token
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Check if user is logged in by verifying token expiry
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    return false;
  }

  // Get current logged-in user's details from the token
  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return { email: '', name: '' }; // Return default user object if not logged in
  }
}
