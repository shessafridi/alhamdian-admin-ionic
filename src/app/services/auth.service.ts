import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/users/login';
import { map, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { LoginUser } from '../models/users/login-user';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { InvalidCredentialsError } from '../models/errors/invalid-credentials-error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  isAuthenticated() {
    const token = this.tokenService.getToken();
    if (!token) return false;

    console.log({ token }, 'isAuthenticated');
    return this.tokenService.isTokenValid(token);
  }

  signIn(login: Login) {
    return this.httpClient
      .post<ApiResponse<LoginUser>>(environment.apiUrl + '/login', login, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((res) => {
          if (res.ErrorMessage || !res.Successful)
            throw new InvalidCredentialsError();

          const isValid = this.tokenService.isTokenValid(
            res.Response.access_token
          );

          console.log('Expired: ', !isValid);
          if (isValid) this.tokenService.setToken(res.Response.access_token);
        })
      );
  }

  signOut() {
    this.tokenService.clear();
    this.router.navigateByUrl('/');
  }
}
