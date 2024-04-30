import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../../application/components/login-form/login-form.component';
import { IUserSession } from '../../../domain/models/user-session.interface';
import { AuthPort } from '../../../domain/ports/auth/auth.port';
import { AUTH_PORT_TOKEN } from '../../../app.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private router: Router,
    @Inject(AUTH_PORT_TOKEN) private authPort: AuthPort) { }

  doLogin(loginInformation: IUserSession): void {
    this.authPort.login(loginInformation).then(() => this.goToDashboard())
  }

  goToDashboard(): void {
    this.router.navigate(['dashboard/registrar-orden']);
  }
}
