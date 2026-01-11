import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  URL = 'http://localhost:5206/api/auth';

  constructor(private http: HttpClient) {}

  login(obj: any) {
    return this.http.post<{ token: string; role: string; msg: string }>(
      this.URL + '/login',
      obj
    );
  }
  signupStudent(obj: any) {
    return this.http.post<{ msg: string; isAdded: boolean }>(
      this.URL + '/signup/student',
      obj
    );
  }
}
