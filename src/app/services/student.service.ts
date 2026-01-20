import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  StudentURL: string = 'http://localhost:5206/student';

  constructor(private httpClient: HttpClient) {}

  // Helper function to get auth headers
  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  getAllStudent() {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.StudentURL,
      { headers: this.getAuthHeaders() }
    );
  }

  addStudent(obj: any) {
    return this.httpClient.post<{ msg: string }>(
      this.StudentURL,
      obj,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteStudent(id: string) {
    return this.httpClient.delete<{ msg: string }>(
      this.StudentURL + '/' + id,
      { headers: this.getAuthHeaders() }
    );
  }

  editStudent(newObj: any) {
    return this.httpClient.put<{ msg: string }>(
      this.StudentURL,
      newObj,
      { headers: this.getAuthHeaders() }
    );
  }

  // Get student by user ID
  getStudentByUserId(userId: string) {
    return this.httpClient.get<{ tab: any }>(
      this.StudentURL + '/user/' + userId,
      { headers: this.getAuthHeaders() }
    );
  }

  // Get all students with their user info
  getAllStudentsWithUsers() {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.StudentURL + '/with-users',
      { headers: this.getAuthHeaders() }
    );
  }
}

