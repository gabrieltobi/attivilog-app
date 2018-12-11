import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
httpOptions.headers.append('token', 'eyJhbGciOiJIUzUxMiJ9.eyJzZW5oYSI6IjgzOTIzOGEiLCJpc3MiOiJodHRwOi8vZG9jd3MuYXR0aXZpbG9nLmNvbS5iciIsInVzdWFyaW8iOiJ0ZXN0ZSJ9.kldqZJKaWnucLOBiYGwNuWrsLLqgVppDk8la_YJV1IWPga0tYI1gkWJ9XNc3EHq7F1jqk5VI32Xt86LuG_mRyw')
const apiUrl = "http://api-homologacao.attivilog.com.br:3003";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  get(api): Observable<any> {
    const url = apiUrl + api;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  post(api, data): Observable<any> {
    const url = apiUrl + api;
    return this.http.post(url, data, httpOptions)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  put(api, data): Observable<any> {
    const url = apiUrl + api;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(api): Observable<{}> {
    const url = apiUrl + api;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
