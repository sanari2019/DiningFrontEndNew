import { Injectable } from '@angular/core';
import { customerType } from './customertype.model';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CustomerTypeService {

    private URL = "https://localhost:7146/CustomerType";
    private customertype = customerType;
    //private handleError="";

    constructor(private http: HttpClient) { }

    getCustomerTypes(): Observable<customerType[]> {
        return this.http.get<customerType[]>(this.URL)
    }

    getCustomerTypedata(data: customerType[]) {
        console.log(JSON.stringify(data))
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


    private initializeCustomerType(): customerType {
        return {
            id: 0,
            name: "",
        };
    }

}



