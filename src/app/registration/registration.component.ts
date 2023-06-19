import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Registration } from './registration.model';
import { RegistrationService } from './registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncrDecrService } from '../shared/EncrDecrService.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ConfirmPasswordValidator } from '../shared/confirm-password.validator';
// import { CustomerType } from '../payment/customertype.model';
import { customerType } from '../shared/customertype.model';


import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  customerTypes: customerType[] = []; // Array to store customer types
  registration: Registration = new Registration;
  errorMessage: string | undefined;
  pageTitle = 'New User';
  submitted: boolean = false;
  public loadedRegistration: Registration | undefined;
  private validationMessages: { [key: string]: { [key: string]: string } };


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationservice: RegistrationService,
    private encdecservice: EncrDecrService
  ) {

    // Defines all of the validation messages for the form.
    //These could instead be retrieved from a file or database.

    this.validationMessages = {
      firstName: {
        required: 'first name is required.',
        minlength: 'First name must be at least three characters.'
      },
      lastName: {
        required: 'last name is required.'
      },
      email: {
        required: 'user name is required.'
      },
      password: {
        required: 'Password is required.'
      },

    };


  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      custTypeId: ['', Validators.required],
      custId: ['', [Validators.required]],
      firstName: ['', [Validators.minLength(3)]],
      lastName: ['', [Validators.maxLength(50)]],
      userName: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],

      // phoneNumber: ['', [this.validatePhoneNumber()]]
    },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
    this.loadCustomerTypes(); // Load customer types from the backend API

    this.registrationForm.patchValue({
      // customerType: null // Set the first available option as default
    });
  }

  loadCustomerTypes() {
    this.registrationservice.getCustType().subscribe(
      (customerTypes: customerType[]) => {
        this.customerTypes = customerTypes;
        // console.log('Customer Types:', this.customerTypes);
      },
      (error: any) => {
        console.error('Error occurred while fetching customer types:', error);
      }
    );
  }





  // validateStaffId(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const value = control.value;
  //     // Perform your custom validation logic for staffId
  //     // Return an object with a key-value pair if validation fails
  //     // Example validation: Staff ID must be at least 4 characters long
  //     if (value && value.length < 4) {
  //       return { invalidStaffId: true };
  //     }
  //     return null; // Validation passed
  //   };
  // }

  // validatePhoneNumber(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const value = control.value;
  //     // Perform your custom validation logic for phoneNumber
  //     // Return an object with a key-value pair if validation fails
  //     // Example validation: Phone number must be numeric
  //     if (value && !/^\d+$/.test(value)) {
  //       return { invalidPhoneNumber: true };
  //     }
  //     return null; // Validation passed
  //   };
  // }


  getCustomerTypes(): string[] {
    return ['staff', 'outsourced', 'guest'];
  }
  get regEmail() {
    return this.registrationForm.get('userName')
  }

  //   setPatternValidator(){
  //     this.registrationForm.get('email')?.setValidators(Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"));  
  // }
  // emailValidator(control: { value: string; }) {
  //   if (control.value) {
  //     const matches = control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
  //     return matches ? null : { 'invalidEmail': true };
  //   } else {
  //     return null;
  //   }
  // }
  save(): void {
    this.submitted = true;

    if (this.registrationForm.valid) {
      if (this.registrationForm.dirty) {
        const p = { ...this.registration, ...this.registrationForm.value };

        // Perform further actions based on the selected customer type
        if (p.customerType === 'staff' || p.customerType === 'outsourced') {
          console.log('Staff ID:', p.staffId);
        } else if (p.customerType === 'guest') {
          console.log('Phone Number:', p.phoneNumber);
        }

        p.password = this.encdecservice.set('123456$#@$^@1ERF', p.password);
        if (p.userName !== "") {
          this.registrationservice.getUserbyusername(p.userName)
            .subscribe((rslt: Registration) => {
              this.loadedRegistration = rslt;
              if (this.loadedRegistration == null) {
                if (p.id === 0) {
                  if (confirm(`You are about creating account for user: ${p.firstName + ' ' + p.lastName}?`)) {
                    this.registrationservice.createUser(p)
                      .subscribe({
                        next: () => this.onSaveComplete(),
                        error: err => this.errorMessage = err
                      });
                  }
                }
              }
            }
            )

        }
        else {
          this.onSaveComplete();
        }
      }
      else {
        this.errorMessage = 'Please correct the validation errors.';
      }
    } else {
      // Form is invalid, handle the validation errors
      console.log('Form Errors:', this.registrationForm.errors);
      console.log('First Name Errors:', this.registrationForm.get('firstName')?.errors);
      console.log('Last Name Errors:', this.registrationForm.get('lastName')?.errors);
      // ...
    }
  }

  getUser(username: string): Registration {
    this.registrationservice.getUserbyusername(username)
      .subscribe({
        next: (registration: Registration) => this.registration,
        error: err => this.errorMessage = err
      });
    return this.registration
  }

  onSaveComplete(): void {
    // this.registrationForm.reset();
    this.router.navigate(['/registrations']);
  }

  // isStaffOrOutsourced(): boolean {
  //   const customerType = this.registrationForm.get('customerType')?.value;
  //   return customerType === 'staff' || customerType === 'outsourced';
  // }

  // isGuest(): boolean {
  //   const customerType = this.registrationForm.get('customerType')?.value;
  //   return customerType === 'guest';
  // }

  isRegistered(): boolean {
    // Implement your logic here to check if the user is registered
    // For example, you can check if the registrationForm is valid
    return this.registrationForm.valid;
  }
}


