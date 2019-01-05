import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    const url = `${ environment.api }/${ endpoint }`;
    return this.http.get(url);
  }

  put(endpoint: string, body: any) {
    const url = `${ environment.api }/${ endpoint }`;
    return this.http.put(url, body);
  }

  post(endpoint: string, body: any) {
    const url = `${ environment.api }/${ endpoint }`;
    return this.http.post(url, body);
  }

  delete(endpoint: string) {
    const url = `${ environment.api }/${ endpoint }`;
    return this.http.delete(url);
  }
}
