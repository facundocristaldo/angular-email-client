import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
  });
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  get username() {
    return this.signinForm.get('username');
  }
  get password() {
    return this.signinForm.get('password');
  }
  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    }
    console.log(this.signinForm.value);
    this.auth.signin(this.signinForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl("/inbox")
      },
      error: (error) => {
        if (!error.status) {
          this.signinForm.setErrors({ noConnection: true });
        } else if (error.username || error.password) {
          this.signinForm.setErrors({ credencialsError: true });
        } else {
          this.signinForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
