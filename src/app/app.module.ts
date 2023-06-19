import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationEditComponent } from './registration-edit/registration-edit.component';
import { RegistrationDetailComponent } from './registration-detail/registration-detail.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { EncrDecrService } from '../app/shared/EncrDecrService.service';
import { AuthService } from './auth/auth.service';
import { AppMaterialModule } from './app-material/app-material.module';
import { AuthGuard } from './auth/auth.guard';
import { PaymentComponent } from './payment/payment.component';
import { VoucherComponent } from './voucher/voucher.component';
import { StaffpaymentComponent } from './staffpayment/staffpayment.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { VoucherNewComponent } from './voucher-new/voucher-new.component';
import { OutsourcedpaymentComponent } from './outsourcedpayment/outsourcedpayment.component';
import { GuestpaymentComponent } from './guestpayment/guestpayment.component';
import { AppMenuComponent } from './appmenu.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OnlinepaymentComponent } from './onlinepayment/onlinepayment.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
//import { ReactiveFormEmailValidationComponent } from "./components/reactive-form-email-validation/reactive-form-email-validation.component";

@NgModule({
  declarations: [AppComponent, AppMenuComponent, HomeComponent, ProfileComponent, AboutComponent, HelpComponent, NotFoundComponent, LoginComponent, RegistrationComponent, RegistrationEditComponent, RegistrationDetailComponent, RegistrationListComponent, PaymentComponent, VoucherComponent, StaffpaymentComponent, PaymentDetailComponent, VoucherNewComponent, OutsourcedpaymentComponent, GuestpaymentComponent, OnlinepaymentComponent, ForgotPasswordComponent],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    MatPaginatorModule,


  ],
  providers: [EncrDecrService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
