import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientWrapper {
  constructor(private http: HttpClient) {}

  /**
   * HTTP GET request wrapper returning a Promise of type T
   * @param url - request URL
   * @param headers - optional HttpHeaders
   */
  get<T>(url: string, headers?: HttpHeaders): Promise<T> {
    return lastValueFrom(this.http.get<T>(url, { headers }));
  }

  /**
   * HTTP POST request wrapper returning a Promise of type T
   * @param url - request URL
   * @param body - payload to send
   * @param headers - optional HttpHeaders
   */
  post<T>(url: string, body: any, headers?: HttpHeaders): Promise<T> {
    return lastValueFrom(this.http.post<T>(url, body, { headers }));
  }

  /**
   * HTTP PUT request wrapper returning a Promise of type T
   * @param url - request URL
   * @param body - payload to send
   * @param headers - optional HttpHeaders
   */
  put<T>(url: string, body: any, headers?: HttpHeaders): Promise<T> {
    return lastValueFrom(this.http.put<T>(url, body, { headers }));
  }

  /**
   * HTTP DELETE request wrapper returning a Promise of type T
   * @param url - request URL
   * @param headers - optional HttpHeaders
   */
  delete<T>(url: string, headers?: HttpHeaders): Promise<T> {
    return lastValueFrom(this.http.delete<T>(url, { headers }));
  }
}
