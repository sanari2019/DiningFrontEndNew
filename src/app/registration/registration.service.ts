import { Injectable } from '@angular/core';
import { Registration } from './registration.model';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { EnvironmentUrlService } from '../shared/services/environment-url.service';
import { CustomerType } from '../payment/customertype.model';
import { customerType } from '../shared/customertype.model';
import { ServiceUrl } from '../shared/serviceurl.model';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  private userURL = "https://localhost:7146/user";
  // private userURL1 = "http://localhost:5057/";
  private reg = Registration;
  //private handleError="";
  // private ctypeURL = ServiceUrl.url + "customertype";
  // private ctypeURL = "https://localhost:7146/customertype";
  private custttype = CustomerType;
  // serviceUrl:ServiceUrl|undefined;
  private ctypeURL = ServiceUrl.url + "customertype"





  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  getUsers(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.userURL)
    // .pipe(
    //   tap(data => this.getUserdata(data)),
    //   catchError(this.handleError)
    // );
  }

  getUserdata(data: Registration[]) {
    console.log(JSON.stringify(data))
  }

  getUser(id: number): Observable<Registration> {
    if (id === 0) {
      return of(this.initializeRegistration());
    }
    const url = `${this.userURL}/${id}`;
    return this.http.get<Registration>(url)
      .pipe(
        tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  getUserbyusername(username: string): Observable<Registration> {

    const url = `${this.envUrl.urlAddress}/user/getuser/${username}`;
    return this.http.get<Registration>(url)
      .pipe(
        tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  createUser(registration: Registration): Observable<Registration> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    registration.id = 0;
    return this.http.post<Registration>(this.envUrl.urlAddress + '/user', registration, { headers })
      .pipe(
        tap(data => console.log('createUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  deleteUser(reg: Registration): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.userURL}/deleteuser`;
    return this.http.post<Registration>(url, reg)
      .pipe(
        tap(data => console.log('deleteUser: ' + reg.firstName)),
        catchError(this.handleError)
      );
  }

  updateUser(registration: Registration): Observable<Registration> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.userURL}/${registration.id}`;
    return this.http.put<Registration>(url, registration, { headers })
      .pipe(
        tap(() => console.log('updateUser: ' + registration.id)),
        // Return the product on an update
        map(() => registration),
        catchError(this.handleError)
      );
  }


  getCustType(): Observable<customerType[]> {
    return this.http.get<customerType[]>(this.ctypeURL)
    // .pipe(
    //   tap(data => this.getUserdata(data)),
    //   catchError(this.handleError)
    // );
  }



  private initializeCustType(): customerType {
    return {
      id: 0,
      name: "",
    };
  }

  private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage!: string;
    if (err.error && err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status!}: ${err.body?.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


  private initializeRegistration(): Registration {
    return {
      id: 0,
      custTypeId: 0,
      custId: "",
      firstName: "",
      lastName: "",
      userName: "",
      password: ""
    };
  }

}



