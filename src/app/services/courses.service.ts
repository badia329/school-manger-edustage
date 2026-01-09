import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
coursesUrl: string = 'http://localhost:4306/courses';
  constructor(private httpClient: HttpClient) {}
  getAllCourses() {
    return this.httpClient.get(this.coursesUrl);
  }
  addCourse(obj: any) {
    return this.httpClient.post(this.coursesUrl, obj);
  }
  deleteCourse(id: number) {
    return this.httpClient.delete(this.coursesUrl + '/' + id);
  }
  editCourse(newObj: any) {
    return this.httpClient.put(this.coursesUrl, newObj);
  }
}
