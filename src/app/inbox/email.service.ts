import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailStructure, EmailSummary, SendEmailStructure } from './EmailInterface';




@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = "https://api.angular-email.com"

  constructor( private http:HttpClient) { }


  getEmails(){
    return this.http.get<EmailSummary[]>(`${this.baseUrl}/emails`)
  }

  getEmail(id:string){
    return this.http.get<EmailStructure>(`${this.baseUrl}/emails/${id}`)
  }
  sendEmail(email:SendEmailStructure){
    return this.http.post(`${this.baseUrl}/emails`,email)
  }
}
