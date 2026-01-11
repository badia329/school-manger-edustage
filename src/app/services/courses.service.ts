import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
coursesUrl: string = 'http://localhost:5206/courses';
  constructor(private httpClient: HttpClient) {}
  getAllCourses() {
    return this.httpClient.get(this.coursesUrl);
  }
  addCourse(obj: any) {
    return this.httpClient.post<{msg: string}>(this.coursesUrl, obj);
  }
  deleteCourse(id: number) {
    return this.httpClient.delete<{ tab: any, nbr: number }>(this.coursesUrl + '/' + id);
  }
  editCourse(newObj: any) {
    return this.httpClient.put(this.coursesUrl, newObj);
  }
}
