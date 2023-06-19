import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Registration } from '../registration/registration.model';
import { RegistrationService } from '../registration/registration.service';
import { EncrDecrService } from '../shared/EncrDecrService.service';


@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public notLoggedIn = new BehaviorSubject<boolean>(false);
  public registration: Registration | undefined;
  private pswrd?: string;
  public loginuser: Registration | undefined;
  // public result=0;



  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router, private regservice: RegistrationService, private encservice: EncrDecrService
  ) { }

  //   login(reg: Registration): Number{

  //   //  let result=0;
  //    if(reg.userName!==undefined){
  //     this.loginuser=reg;
  //     this.getUser(reg.userName)
  //     if(this.registration!==undefined){
  //       this.result=2;
  //     }
  //     else{
  //       this.result=1;
  //     }

  //   }
  //    return this.result;
  // }


  login(reg: Registration) {
    let result = 0;
    if (reg.userName !== undefined) {
      this.regservice.getUserbyusername(reg.userName)
        .subscribe((rlst: Registration) => {
          // if(this.loginuser!==undefined){
          this.registration = rlst;
          this.pswrd = this.encservice.set('123456$#@$^@1ERF', reg.password);
          if (reg.userName === this.registration?.userName && this.pswrd === this.registration?.password) {
            this.loggedIn.next(true);
            localStorage.setItem('user', JSON.stringify(this.registration));
            this.router.navigate(['/']);
            result = 2;
            this.notLoggedIn.next(true);
          }
          else {
            result = 1;
            this.notLoggedIn.next(false);
          }
          // }
        });
      // return this.loggedIn.value;
    }
    // return false;
    // return this.notLoggedIn;
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
