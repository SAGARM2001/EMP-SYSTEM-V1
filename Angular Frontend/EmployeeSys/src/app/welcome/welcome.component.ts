import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  onLogout() {
    localStorage.removeItem('token'); // Remove the token from local storage
    localStorage.removeItem('userData'); // Remove user data from local storage
    this.router.navigate(['/login']);
  }
}
