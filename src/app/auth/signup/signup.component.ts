import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
          this.uniqueUsername.validate,
        ],
        [
          //TODO uncomment when validator is ended
          //this.uniqueUsername.validate
        ]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ]),
    },
    {
      validators: [this.matchPassword.validate],
    }
  );

  get username() {
    return this.authForm.get('username');
  }
  get password() {
    return this.authForm.get('password');
  }
  get passwordConfirmation() {
    return this.authForm.get('passwordConfirmation');
  }

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private auth: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    console.log(this.authForm.value);
    this.auth.signup(this.authForm.value).subscribe({
      next: (response) => {
        console.log(this)
        this.router.navigateByUrl("/inbox")
      },
      error: (error) => {
        if(!error.status){
          this.authForm.setErrors({noConnection:true})
        }else if(error.status===422){
          this.authForm.setErrors({nonUniqueUsername:true})
        }else{
          this.authForm.setErrors({unknownError:true})
        }
      },
    });
  }
}
