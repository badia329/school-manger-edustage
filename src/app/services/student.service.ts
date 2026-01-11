import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  StudentURL: string = 'http://localhost:5206/student';
  constructor(private httpClient: HttpClient) {}
  getAllStudent() {
    return this.httpClient.get(this.StudentURL);
  }
  addStudent(obj: any) {
    return this.httpClient.post(this.StudentURL, obj);
  }
  deleteStudent(id: number) {
    return this.httpClient.delete(this.StudentURL + '/' + id);
  }
  editStudent(newObj: any) {
    return this.httpClient.put(this.StudentURL, newObj);
  }
  signupStudent(obj: any) {
    return this.httpClient.post<{ msg: string; isAdded: boolean }>(
      this.StudentURL + '/signup',
      obj
    );
  }
  login(obj: any) {
    return this.httpClient.post<{ msg: string; role: string }>(
      this.StudentURL + '/login',
      obj
    );
  }
}
