import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';
import { EmailStructure } from '../EmailInterface';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {
  showModal = false
  @Input() email: EmailStructure;

  constructor(private authService : AuthService, private emailService:EmailService) { 
    
  }

  ngOnChanges(): void {
    this.email={
      ...this.email,
      to:this.email.from,
      from:this.email.to,
      subject:`RE: ${this.email.subject}`,
      text:`\n\n\n---- ${this.email.from} wrote: \n'\n> ${this.email.text.replace(/\n/gi,'\n> ')}\n'`,
    }
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
