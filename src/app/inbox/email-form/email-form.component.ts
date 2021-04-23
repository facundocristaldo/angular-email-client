import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailStructure } from '../EmailInterface';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  @Output() emailSubmit= new EventEmitter()
  @Input() email:EmailStructure
  emailForm : FormGroup;


  constructor() { }

  ngOnInit(): void {
    const {subject, from, to, text}=this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to,
        [
          Validators.required,
          Validators.email
        ]),
      from: new FormControl({value:from,disabled:true}),
      subject: new FormControl(subject,
        [
          Validators.required,
        ]),
      text: new FormControl(text,
        [
          Validators.required,
        ])
    })
  }
  onSend(){
    if(this.emailForm.invalid)return
    this.emailSubmit.emit(this.emailForm.value)
  }

}
