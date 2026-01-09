import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  teacherURL: string = 'http://localhost:4306/teacher';
  constructor(private httpClient: HttpClient) {}
  getAllteachers() {
    return this.httpClient.get(this.teacherURL);
  }
  addteacher(obj: any) {
    return this.httpClient.post(this.teacherURL, obj);
  }
  deleteteacher(id: number) {
    return this.httpClient.delete(this.teacherURL + '/' + id);
  }
  editteacher(newObj: any) {
    return this.httpClient.put(this.teacherURL, newObj);
  }
}
