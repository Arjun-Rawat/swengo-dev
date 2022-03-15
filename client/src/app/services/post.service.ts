import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthhttpService } from './authhttp.service';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  domain = environment.domain;

  constructor(
    private http: AuthhttpService,
    private http2: HttpClient,
    private authService: AuthService
  ) {}

  createPost(postData: any) {
    this.authService.createAuthenticationHeaders();
    return this.http.post(
      this.domain + '/v1/post',
      postData,
      this.authService.options
    );
  }
  getPosts() {
    this.authService.createAuthenticationHeaders();
    return this.http.get(this.domain + '/v1/post?sortBy=desc&limit=100&page=1', this.authService.options);
  }
}
