import * as nodemailer from 'nodemailer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  private formSubmitAttempt: boolean = false;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }



  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      const userName = this.form.get('userName')?.value;

      // Make an API request to fetch the password from the backend
      // this.retrievePassword(userName);
    } else {
      this.errorMessage = 'Please enter a valid username.';
    }
  }

  // retrievePassword(userName: string) {
  //   // Replace the placeholder URL with your actual backend API endpoint for retrieving the password
  //   const passwordEndpoint = 'https://your-api-endpoint.com/password';

  //   // Send a request to the backend API to retrieve the password
  //   this.http.get(passwordEndpoint, { params: { username: userName } }).subscribe(
  //     (response: any) => {
  //       const password = response.password;

  //       // Send the email with the password to the user
  //       this.sendEmail(userName, password);

  //       console.log(`Password has been sent to ${userName}`);
  //       // You can also navigate to a success page or display a success message here
  //     },
  //     (error: any) => {
  //       console.error('Failed to retrieve the password:', error);
  //       this.errorMessage = 'Failed to retrieve the password. Please try again later.';
  //     }
  //   );
  // }

  // sendEmail(userName: string, password: string) {
  //   // Create a Nodemailer transporter
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.office365.com',
  //     port: 587, // or the appropriate port number
  //     secure: true, // Set to true if using SSL/TLS
  //     auth: {
  //       user: 'samuel.anari@evercare.ng',
  //       pass: 'Flyhigh2009'
  //     }
  //   });

  //   // Setup email data
  //   const mailOptions = {
  //     from: 'samuel.anari@evercare.ng',
  //     to: userName,
  //     subject: 'Password Recovery',
  //     text: `Dear User, your password is: ${password}`
  //   };

  //   // Send email using the transporter
  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.error('Failed to send email:', error);
  //       this.errorMessage = 'Failed to send email. Please try again later.';
  //     } else {
  //       console.log('Email sent:', info.response);
  //       // Optionally, you can show a success message to the user
  //     }
  //   });
  // }
}