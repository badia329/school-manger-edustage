import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  coursesUrl: string = 'http://localhost:5206/courses';
  constructor(private httpClient: HttpClient) {}
  getAllCourses() {
    return this.httpClient.get<{ tab: any, nbr: number }>(this.coursesUrl);
  }
  addCourse(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.coursesUrl, obj);
  }
  deleteCourse(id: string) {
    return this.httpClient.delete<{ msg: string }>(this.coursesUrl + '/' + id);
  }
  editCourse(id: string, newObj: any) {
    return this.httpClient.put<{ msg: string }>(
      this.coursesUrl + '/' + id,
      newObj
    );
  }
}
