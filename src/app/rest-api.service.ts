//Reference: https://www.djamware.com/post/5b5cffaf80aca707dd4f65aa/building-crud-mobile-app-using-ionic-4-angular-6-and-cordova

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

const apiUrl = "http://api-homologacao.attivilog.com.br:3003";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient, private storage: Storage) { }

  private handleError(error: HttpErrorResponse) {
    return throwError({ error: error.error, message: error.message });
  }

  private extractData(res: Response) {
    return res || {};
  }

  post(api, data, token): Observable<any> {
    return this.http.post(this.getUrl(api), data, this.getOptions(token))
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getUrl(api) {
    return (apiUrl + api);
  }

  getOptions(token) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('token', token);

    return { headers }
  }

  async getToken() {
    const userData = await this.storage.get('userDate') || {};
    return userData.token;
  }
}
