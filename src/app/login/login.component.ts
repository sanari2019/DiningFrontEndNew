import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
// import { Router } from '@angular/router'; // Add this import statement


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;                    // {1}
  private formSubmitAttempt!: boolean; // {2}
  loginMessage = '';
  notLoggedIn$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService // {4}
  ) { }

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value);

      if (this.authService.notLoggedIn) {
        this.formSubmitAttempt = true;
      }
      else {

        this.loginMessage = "Username/Password invalid";
      }

    }

  }

  // // Method to navigate to the "Forgot Password" page
  // goToForgotPassword() {
  //   this.router.navigate(['../forgot-password']);
  // }

}
