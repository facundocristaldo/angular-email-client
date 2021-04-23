import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmailService } from './email.service';
import { EmailStructure } from './EmailInterface';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<EmailStructure> {

  constructor(private emailService:EmailService,private router:Router) { }

  resolve(route:ActivatedRouteSnapshot){
    const { id } = route.params
    return this.emailService.getEmail(id).pipe(
      catchError(()=>{
        this.router.navigateByUrl("/inbox/not-found")
        return EMPTY
      })
    )
  }
}
