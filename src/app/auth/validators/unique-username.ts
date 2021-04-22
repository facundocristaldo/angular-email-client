import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, AsyncValidator } from "@angular/forms";
import { of } from "rxjs";
import { map,catchError } from "rxjs/operators"
import { AuthService } from "../auth.service";
@Injectable({
  providedIn:"root"
})
export class UniqueUsername implements AsyncValidator {
  constructor(private http:HttpClient, private auth:AuthService){}
  //TODO: end this when response from udemy angular course
  validate = (formControl:FormControl)=>{
    const { value } = formControl
    console.log("validator value",value)
    //TODO: remote return null
    return null;
    return this.auth.usernameAvailable(value).pipe(
        map((value)=>{if(value.available) return null}),
        catchError((err)=>{
          return of({nonUniqueUsername:true})
        })
      )
  }
}
