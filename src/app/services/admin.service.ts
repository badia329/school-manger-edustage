import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminUrl: string = 'http://localhost:5206/admin';
  teachersUrl: string = 'http://localhost:5206/teachers';

  constructor(private httpClient: HttpClient) {}

  // Helper function to get auth headers
  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  // Get all users
  getAllUsers() {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.adminUrl + '/users',
      { headers: this.getAuthHeaders() }
    );
  }

  // Get all teachers (using new teachers endpoint)
  getAllTeachers() {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.teachersUrl,
      { headers: this.getAuthHeaders() }
    );
  }

  // Get all students (using new students endpoint)
  getAllStudents() {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      'http://localhost:5206/students',
      { headers: this.getAuthHeaders() }
    );
  }

  // Validate teacher
  validateTeacher(teacherId: string) {
    return this.httpClient.put<{ msg: string }>(
      this.adminUrl + '/teachers/' + teacherId + '/validate',
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  // Delete user
  deleteUser(userId: string) {
    return this.httpClient.delete<{ msg: string }>(
      this.adminUrl + '/users/' + userId,
      { headers: this.getAuthHeaders() }
    );
  }

  // Get dashboard stats
  getStats() {
    return this.httpClient.get<{ 
      usersCount: number;
      teachersCount: number;
      studentsCount: number;
      coursesCount: number;
    }>(
      this.adminUrl + '/stats',
      { headers: this.getAuthHeaders() }
    );
  }
}

