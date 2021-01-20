import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { CryptoService } from './crypto.service';

import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  USER = 'pruebatest@yopmail.com';
  PASS = 'pwdTest123#';
  constructor(
    private http: HttpClient,
    private cryptoService: CryptoService,
    private storageService: StorageService
  ) {}

  doLogin(userMail: string, userPassWord: string): Observable<string> {
    console.log(
      '>>Data:',
      `{user_mail: '${userMail}', user_password: '${userPassWord}'}`
    );
    return this.http
      .post<string>(
        `${environment.apiUrl}/login?apiKey=${environment.apiKey}`,
        {
          payload: this.cryptoService.encrypt(
            `{user_mail: '${userMail}', user_password: '${userPassWord}'}`
          ),
        }
      )
      .pipe(
        catchError((error) => {
          console.log('>> Error', error);
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(errorMsg);
        })
      );
  }

  /* private getPurchases(
    vaultId: string,
    filterField: string,
    filterValue: string,
    beginDate: string,
    endDate: string,
    page: number,
    itemsPage: number */
  getPurchases(): Observable<any> {
    console.log('>>Token:', this.storageService.getCurrentToken());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.storageService.getCurrentToken(),
      }),
    };
    console.log({
      payload: this.cryptoService.encrypt(
        `{"begin_date":"2021-01-01T14:31:10.828Z","end_date":"2021-01-17T14:31:10.828Z","vault_id":"b73bde9f-6891-4b2e-847e-484be1830794","filter_value":"","filter_field":"","page":0,"items_per_page":4}`
      ),
    });
    return this.http
      .post<any>(
        `${environment.apiUrl}/pockets/reports/transactions/purchases?apiKey=${environment.apiKey}`,
        {
          payload: this.cryptoService.encrypt(
            `{"begin_date":"2021-01-01","end_date":"2021-01-19","vault_id":"b73bde9f-6891-4b2e-847e-484be1830794","filter_value":"","filter_field":"","page":0,"items_per_page":50}`
          ),
        },
        httpOptions
      )
      .pipe(
        catchError((error) => {
          console.log('>> Error', error);
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(errorMsg);
        })
      );
  }

  getExcelReport(): Observable<any> {
    console.log('>>Token:', this.storageService.getCurrentToken());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.storageService.getCurrentToken(),
      }),
    };
    console.log({
      payload: this.cryptoService.encrypt(
        `{"begin_date":"2021-01-01T14:31:10.828Z","end_date":"2021-01-17T14:31:10.828Z","vault_id":"b73bde9f-6891-4b2e-847e-484be1830794","filter_value":"","filter_field":""}`
      ),
    });
    console.log(
      '>>Url:',
      `${environment.apiUrl}/pockets/reports/transactions/purchases/export?apiKey=${environment.apiKey}`
    );
    return this.http
      .post<any>(
        `${environment.apiUrl}/pockets/reports/transactions/purchases/export?apiKey=${environment.apiKey}`,
        {
          payload: this.cryptoService.encrypt(
            `{"begin_date":"2020-01-01T14:31:10.828Z","end_date":"2021-01-19T14:31:10.828Z","vault_id":"b73bde9f-6891-4b2e-847e-484be1830794","filter_value":"","filter_field":""}`
          ),
        },
        httpOptions
      )
      .pipe(
        catchError((error) => {
          console.log('>> Error', error);
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(errorMsg);
        })
      );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
