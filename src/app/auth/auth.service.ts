import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from "rxjs/operators";

interface UsernameAvailable{
  available:boolean
}
interface SignupCredentials{
  username:string,
  password:string,
  passwordConfirmation:string
}
interface SigninCredentials{
  username:string,
  password:string,
  passwordConfirmation:string
}
interface SignupReponse{
  username:string
}
interface SignedinResponse{
  authenticated:boolean,
  username:string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = "https://api.angular-email.com/auth"
  isSignedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailable>(`${this.baseUrl}/username`, {
      username,
    });
  }

  signup(credencials:SignupCredentials){
    return this.http.post<SignupReponse>(`${this.baseUrl}/signup`, credencials)
    .pipe(
      tap(()=>{ 
        this.isSignedin$.next(true)
      })
    )
  }
  signin(credencials:SigninCredentials){
    return this.http.post<SignupReponse>(`${this.baseUrl}/signin`, credencials)
    .pipe(
      tap(()=>{ 
        this.isSignedin$.next(true)
      })
    )
  }
  signout(){
    return this.http.post<SignupReponse>(`${this.baseUrl}/signout`, {})
    .pipe(
      tap(()=>{ 
        this.isSignedin$.next(false)
      })
    )
  }
}
