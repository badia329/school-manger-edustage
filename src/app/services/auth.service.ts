import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersUrl = 'http://localhost:5206/users';
  constructor(private httpClient: HttpClient) {}

  signup(obj: any) {
    return this.httpClient.post<{ msg: string, isAdded: boolean }>(this.usersUrl + '/signup', obj);
  }
  login(obj: any) {
    return this.httpClient.post(this.usersUrl + '/login', obj);
  }
}
