import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginForm, LoginResponse, RegisterForm } from '../models/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/';

  private readonly _httpClient = inject(HttpClient);

  token = signal('');

  constructor() {
    const localStorageToken = localStorage.getItem('authtoken');
    if (localStorageToken) {
      this.token.update(() => localStorageToken);
    }
  }

  register(registerForm: RegisterForm) {
    return this._httpClient.post(this.baseUrl + 'register', registerForm);
  }

  login(loginForm: LoginForm) {
    return this._httpClient
      .post<LoginResponse>(this.baseUrl + 'login', loginForm)
      .pipe(
        map((data: LoginResponse) => {
          this.token.update(() => data.accessToken);
          localStorage.setItem('authtoken', data.accessToken);
        })
      );
  }
}
