import { InvalidCredentialsError } from './../models/errors/invalid-credentials-error';
import { Login } from './../models/users/login';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  busy = false;
  lastError: string | null = null;

  loginDetails: Login = {
    Password: '',
    UsernameOrEmail: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.signOut();
  }

  login() {
    this.busy = true;
    this.authService
      .signIn(this.loginDetails)
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: () => {
          console.log('Logged In');
          this.router.navigate(['/']);
        },
        error: (err: Error) => {
          if (err instanceof InvalidCredentialsError) {
            this.lastError = 'Invalid email or password';
          }
          console.log(this.lastError);
        },
      });
  }
}
