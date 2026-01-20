import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  coursesUrl: string = 'http://localhost:5206/courses';

  constructor(private httpClient: HttpClient) {}

  // Helper function to get auth headers
  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  getAllCourses() {
    return this.httpClient.get<{ tab: any; nbr: number }>(this.coursesUrl);
  }

  addCourse(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.coursesUrl, obj, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteCourse(id: string) {
    return this.httpClient.delete<{ msg: string }>(this.coursesUrl + '/' + id, {
      headers: this.getAuthHeaders(),
    });
  }

  editCourse(id: string, newObj: any) {
    return this.httpClient.put<{ msg: string }>(
      this.coursesUrl + '/' + id,
      newObj,
      { headers: this.getAuthHeaders() }
    );
  }

  // Get course by ID
  getCourseById(id: string) {
    return this.httpClient.get<{ tab: any }>(this.coursesUrl + '/' + id, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get courses by teacher ID
  getCoursesByTeacher(teacherId: string) {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.coursesUrl + '/teacher/' + teacherId,
      { headers: this.getAuthHeaders() }
    );
  }
}

