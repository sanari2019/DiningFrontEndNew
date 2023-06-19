import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { EncrDecrService } from '../shared/EncrDecrService.service';
import { GenericValidator } from '../shared/generic-validator';
import { Payment } from './payment.model';
import { PaymentService } from './payment.service';
import { Voucher } from '../voucher/voucher.model';
import { VoucherService } from '../voucher/voucher.service';
import { PaymentModeService } from '../shared/paymentmode.service';
import { PaymentMode } from '../shared/PaymentMode.Model';
import { Registration } from '../registration/registration.model';

@Component({
  selector: 'app-staffpayment',
  templateUrl: './staffpayment.component.html',
  styleUrls: ['./staffpayment.component.scss']
})
export class StaffpaymentComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];
  pageTitle = "New Staff Ticket"
  message = '';
  staffid = 1;
  errorMessage = '';
  paymentForm!: FormGroup;
  private formSubmitAttempt!: boolean;
  vouchers!: Voucher[];
  paymentmodes!: PaymentMode[];
  payment!: Payment;
  public registration: Registration | undefined;
  private sub!: Subscription;
  private validationMessages!: { [key: string]: { [key: string]: string } };
  private genericValidator!: GenericValidator;
  public dataFields: Object = { text: 'Value', value: 'Id' };
  Units: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private fbstaff: FormBuilder, private router: Router, private paymentmodeservice: PaymentModeService, private voucherservice: VoucherService, private paymentservice: PaymentService, private encdecservice: EncrDecrService) {

    this.validationMessages = {
      employeeNo: {
        required: 'Employee No is required.',
        minlength: 'Employee No must be at least three characters.'
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);


  }

  ngOnInit(): void {

    this.paymentForm = this.fbstaff.group({
      custCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
      voucherId: new FormControl('', [Validators.required, Validators.min(1)]),
      paymentmodeid: new FormControl('', [Validators.required, Validators.min(1)]),
      unit: new FormControl('', Validators.required)

    });
    // this.voucherForm=this.fb2.group({
    //   'id':[null]
    // })
    // Access the locally stored user information
    const user = localStorage.getItem('user');
    this.registration = user ? JSON.parse(user) : undefined;
    this.getVouchers();
    this.getpaymentmodes();

    // Populate custCode input field with user's ID as placeholder
    const custCodeControl = this.paymentForm.get('custCode');
    if (custCodeControl && this.registration) {
      custCodeControl.setValidators([Validators.required, Validators.minLength(3)]);
      custCodeControl.setValue(this.registration.id);
    }
  }
  isFieldInvalid(field: string) {
    return (
      (!this.paymentForm.get(field)?.valid && this.paymentForm.get(field)?.touched) ||
      (this.paymentForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }
  savePayment(): void {
    // console.log(this.registrationForm);
    // console.log('Saved: ' + JSON.stringify(this.registrationForm.value));
    if (this.paymentForm.valid) {
      if (this.paymentForm.dirty) {
        const p = { ...this.payment, ...this.paymentForm.value };
        if (p.custCode !== '') {
          p.dateEntered = new Date();
          var loggeinuser = localStorage.getItem('user');
          this.registration = loggeinuser !== null ? JSON.parse(loggeinuser) : new Registration();
          p.enteredBy = this.registration?.id.toString();
          p.custtypeid = 1;
          p.servedby = "";
          if (confirm(`You are about to generate a ticket for Staff: ${p.custCode}?`)) {
            this.paymentservice.createPayment(p)
              .subscribe({
                next: () => this.onSaveComplete(),
                error: err => this.errorMessage = err
              });
          }
        } else if (p.custCode === '') {
          this.pageTitle = "Enter Employee Code";
          //  this.paymentservice.updatePayment(p)
          //  .subscribe({
          //    next: () => this.onSaveComplete(),
          //     error: err => this.errorMessage = err
          //    });
        }
      }
      // else
      // {
      //  this.onSaveComplete();
      // }
    }
    else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  getVouchers() {
    this.voucherservice.getVoucher(this.staffid).subscribe(res => this.vouchers = res, error => this.errorMessage = <any>error);
  }

  getpaymentmodes() {
    this.paymentmodeservice.getPaymentModes().subscribe(res => this.paymentmodes = res, error => this.errorMessage = <any>error);
  }

  onSaveComplete(): void {
    // this.registrationForm.reset();
    this.router.navigate(['/voucherdetails']);
  }
}
