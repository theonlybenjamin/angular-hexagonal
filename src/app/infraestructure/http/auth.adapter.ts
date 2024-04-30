import { Injectable, inject } from '@angular/core';
import { AuthPort } from '../../domain/ports/auth/auth.port';
import { tap } from 'rxjs';
import { AuthDto } from '../../domain/ports/auth/auth.dto';
import { Endpoints } from '../../domain/enum/endpoints.enum';
import { Observable } from '../../domain/mask/observable.mask';
import { HttpMask } from './http.mask';
import { IUserSession } from '../../domain/models/user-session.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiAuthAdapter implements AuthPort {
  private readonly http: HttpMask = inject(HttpMask);
  login(loginInformation: IUserSession): Observable<AuthDto> {
    return this.http.post<AuthDto>(Endpoints.LOGIN, loginInformation).pipe(
        tap(authDto => {
          localStorage.setItem('token', authDto.accessToken)
          localStorage.setItem('expiration', authDto.expirationTime.toString());
        })
    );
  }
}