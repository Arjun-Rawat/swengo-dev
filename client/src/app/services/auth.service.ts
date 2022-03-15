import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpParamsOptions,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  domain = environment.domain;

  authToken: any = "dfdsfdfsfdsfsd";
  user: any;
  options: any;

  constructor(private http: HttpClient) {}

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    // this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Format set to JSON
        authorization: this.authToken, // Attach token
        // 'Access-Control-Allow-Headers': '*'
      }),
    };
  }

  // Function to create headers, add token, to be used in HTTP requests
  createUploadAuthHeaders() {
    // this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = {
      headers: new HttpHeaders({
        authorization: this.authToken, // Attach token
      }),
    };
  }
  // Function to create headers, add token, to be used in HTTP requests
  returnAuthenticationHeaders() {
    // this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Format set to JSON
        authorization: this.authToken, // Attach token
      }),
    };
  }
}
