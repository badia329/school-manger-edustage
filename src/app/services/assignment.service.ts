import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  assignmentUrl: string = 'http://localhost:5206/assignments';

  constructor(private httpClient: HttpClient) {}

  // Helper function to get auth headers
  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  // Assigner un étudiant à un cours
  assignStudent(obj: any) {
    return this.httpClient.post<{ msg: string; assignment: any }>(
      this.assignmentUrl,
      obj,
      { headers: this.getAuthHeaders() }
    );
  }

  // Récupérer tous les assignments (Admin)
  getAllAssignments() {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.assignmentUrl,
      { headers: this.getAuthHeaders() }
    );
  }

  // Récupérer les étudiants d'un cours
  getStudentsByCourse(courseId: string) {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.assignmentUrl + '/course/' + courseId,
      { headers: this.getAuthHeaders() }
    );
  }

  // Récupérer les cours d'un étudiant
  getCoursesByStudent(studentId: string) {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.assignmentUrl + '/student/' + studentId,
      { headers: this.getAuthHeaders() }
    );
  }

  // Récupérer les assignments d'un professeur
  getAssignmentsByTeacher(teacherId: string) {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.assignmentUrl + '/teacher/' + teacherId,
      { headers: this.getAuthHeaders() }
    );
  }

  // Supprimer une assignment
  deleteAssignment(id: string) {
    return this.httpClient.delete<{ msg: string }>(
      this.assignmentUrl + '/' + id,
      { headers: this.getAuthHeaders() }
    );
  }
}

