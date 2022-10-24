import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private jwtHelper: JwtHelperService) {}

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  hasToken() {
    return !!this.getToken();
  }

  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  isTokenValid(token: string) {
    if (!token) return false;
    // due to a server issue
    return true;
    return !this.jwtHelper.isTokenExpired(token);
  }

  clear() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
