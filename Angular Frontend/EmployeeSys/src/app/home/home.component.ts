import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

    navigateToEmpform() {
        this.router.navigate(['/empform']); // Replace 'login' with the actual route to your login page
    }
}
