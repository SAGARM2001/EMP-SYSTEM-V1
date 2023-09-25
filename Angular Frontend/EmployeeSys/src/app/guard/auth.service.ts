import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  // Simulate a login process (you should replace this with your actual login logic)
  login(userName: string, password: string): boolean {
    // Perform your authentication logic here (e.g., API request)
    if (userName === 'example' && password === 'password') {
      // Authentication successful
      this.isAuthenticated = true;
      return true;
    } else {
      // Authentication failed
      this.isAuthenticated = false;
      return false;
    }
  }

  // Logout the user
  logout(): void {
    // Perform any necessary logout actions (e.g., clearing session data)
    this.isAuthenticated = false;

    // Navigate to the login page
    this.router.navigate(['/login']);
    window.location.reload();
  }

  // Check if the user is authenticated
  checkAuthenticationStatus(): void {
    // Check if a token exists in localStorage to determine authentication status
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }
}
