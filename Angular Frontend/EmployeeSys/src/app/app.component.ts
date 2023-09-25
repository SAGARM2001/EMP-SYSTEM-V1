import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeSys';
  isAuthenticated: boolean = false;
  router: any;

  onLogout() {
    localStorage.removeItem('token'); // Remove the token from local storage
    localStorage.removeItem('userData'); // Remove user data from local storage
    this.router.navigate(['/login']);
  }
}
