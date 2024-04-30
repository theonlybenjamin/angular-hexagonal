import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { IUserSession } from '../../../domain/models/user-session.interface';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Output() loginUserInformation: EventEmitter<IUserSession> = new EventEmitter<IUserSession>();
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('usuario1@cedhetec.com', Validators.required),
    password: new FormControl('123456@a', Validators.required),
  });

  sendUserLoginInformation(): void {
    if (this.loginForm.valid) {
      this.loginUserInformation.emit(this.loginForm.value);
    }
  }
}
