import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSignedIn$ : BehaviorSubject<boolean>;
  
  constructor(private authService:AuthService) { 
    this.isSignedIn$ = this.authService.isSignedin$
  }

  ngOnInit(): void {

  }

}
