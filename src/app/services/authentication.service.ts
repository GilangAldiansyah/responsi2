import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  apiURL = () => 'http://localhost/tamu_api/';


  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiURL}/login.php`, { username, password }).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/register.php`, { username, password });
  }

  isLoggedIn(): boolean {
    // Check if there is a token stored in local storage
    return !!localStorage.getItem('token');
  }



  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')

  }
}
