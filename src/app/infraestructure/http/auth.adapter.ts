import { Injectable, inject } from '@angular/core';
import { AuthPort } from '../../domain/ports/auth/auth.port';
import { AuthDto } from '../../domain/ports/auth/auth.dto';
import { Endpoints } from '../../domain/enum/endpoints.enum';
import { HttpMask } from './http.mask';
import { IUserSession } from '../../domain/models/user-session.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiAuthAdapter implements AuthPort {
  private readonly http: HttpMask = inject(HttpMask);
  login(loginInformation: IUserSession): Promise<AuthDto> {
    return this.http.post<AuthDto>(Endpoints.LOGIN, loginInformation).then(
      authDto => {
        localStorage.setItem('token', authDto.accessToken)
        localStorage.setItem('expiration', authDto.expirationTime.toString());

        return authDto
      }
    );
  }
}