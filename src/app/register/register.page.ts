import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  register() {
    this.authService.register(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          // Redirect to the login page after successful registration
          this.router.navigate(['/auth']);
        }
      },
      (error) => {
        console.error(error);
        // Handle registration error, show a message, etc.
      }
    );
  }
}
