import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';
import { EmailStructure } from '../EmailInterface';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal = false
  email: EmailStructure;
  constructor(private authService : AuthService, private emailService:EmailService) { 
    this.email={
      id:"",
      to:"",
      from:`${this.authService.username}@angular-email.com`,
      subject:"",
      text:"",
      html:""
    }
  }

  ngOnInit(): void {
  }

  dismissModal(){
    this.showModal = false
  }

  onSubmit(email:EmailStructure){
    this.emailService.sendEmail(email).subscribe(()=>{
      this.showModal=false
    })
  }
}
