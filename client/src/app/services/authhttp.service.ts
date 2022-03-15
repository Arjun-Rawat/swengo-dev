import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

import { share, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthhttpService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  post(url: any, data: any, options: any) {
    options = options || this.authService.returnAuthenticationHeaders;
    let ret_val = this.http.post(url, data, options).pipe(
      map((res) => res),
      share()
    );
    // this.authService.updateToken(ret_val);
    return ret_val;
  }

  get(url: any, options: any) {
    options = options || this.authService.returnAuthenticationHeaders;
    let ret_val = this.http.get(url, options).pipe(
      map((res) => res),
      share()
    );
    // this.authService.updateToken(ret_val);
    return ret_val;
  }
}
