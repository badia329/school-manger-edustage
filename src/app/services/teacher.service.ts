import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  teacherURL: string = 'http://localhost:5206/teacher';
  constructor(private httpClient: HttpClient) {}
  getAllTeachers() {
    return this.httpClient.get(this.teacherURL);
  }
  addTeacher(obj: any) {
    return this.httpClient.post(this.teacherURL, obj);
  }
  deleteTeacher(id: number) {
    return this.httpClient.delete(this.teacherURL + '/' + id);
  }
  editTeacher(newObj: any) {
    return this.httpClient.put(this.teacherURL, newObj);
  }
}
