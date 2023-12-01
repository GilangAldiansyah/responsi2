import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canLoad() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login')
      return false;
    }
    return true;
  }
}
