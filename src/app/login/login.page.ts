import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    throw new Error('Method not implemented.');
  }
  login() {
    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['/tamu']);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
