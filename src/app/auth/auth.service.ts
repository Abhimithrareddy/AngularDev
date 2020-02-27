import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
export interface AuthResposnseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) {}

  signUp(emailRec: string, passwordRec: string) {
    return this.http.post<AuthResposnseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBi30mzoNdHQuDamWExk3btfM8W6pZhpxk',
        {
          email: emailRec,
          password: passwordRec,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError));

  }



login(emailRec: string, passwordRec: string) {
 return this.http
 .post<AuthResposnseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBi30mzoNdHQuDamWExk3btfM8W6pZhpxk',
  {
    email: emailRec,
    password: passwordRec,
    returnSecureToken: true
  }
  ).pipe(catchError(this.handleError));
}

private handleError(errorRes: HttpErrorResponse) {
  let errorMessage = 'An unkown error occured!';
  if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorMessage);
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = ' There is no user record corresponding to this user';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is invalid';
      break;
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
  }
  return throwError(errorMessage);

}

}
