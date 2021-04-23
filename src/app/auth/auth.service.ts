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
  isSignedin$ = new BehaviorSubject(null);
  username :string = "";

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
    // this.getAuth().subscribe(response=>{
    //   this.isSignedin$.next(response.authenticated)
    // })
  }

  usernameAvailable(uname: string) {
    return this.http.post<UsernameAvailable>(`${this.baseUrl}/username`, {
      uname,
    });
  }
  getAuth(){
    return this.http.get<SignedinResponse>(`${this.baseUrl}/signedin`).pipe(
      tap(({authenticated,username})=>{
        this.isSignedin$.next(authenticated)
        this.username=username;
      })
    )
  }
  signup(credencials:SignupCredentials){
    return this.http.post<SignupReponse>(`${this.baseUrl}/signup`, credencials)
    .pipe(
      tap(({username})=>{ 
        this.isSignedin$.next(true)
        this.username=username;
      })
    )
  }
  signin(credencials:SigninCredentials){
    return this.http.post<SignupReponse>(`${this.baseUrl}/signin`, credencials)
    .pipe(
      tap(({username})=>{ 
        this.isSignedin$.next(true)
        this.username=username;
      })
    )
  }
  signout(){
    return this.http.post<SignupReponse>(`${this.baseUrl}/signout`, {})
    .pipe(
      tap(()=>{ 
        this.isSignedin$.next(false)
        this.username="";
      })
    )
  }
}
