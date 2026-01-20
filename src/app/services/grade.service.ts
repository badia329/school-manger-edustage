import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  gradesUrl: string = 'http://localhost:5206/grades';

  constructor(private httpClient: HttpClient) {}

  // Helper function to get auth headers
  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  // Ajouter une note
  addGrade(obj: any) {
    return this.httpClient.post<{ msg: string; grade: any }>(
      this.gradesUrl,
      obj,
      { headers: this.getAuthHeaders() }
    );
  }

  // Récupérer les notes d'un étudiant
  getGradesByStudent(studentId: string) {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.gradesUrl + '/student/' + studentId,
      { headers: this.getAuthHeaders() }
    );
  }

  // Récupérer les notes d'un cours
  getGradesByCourse(courseId: string) {
    return this.httpClient.get<{ tab: any; nbr: number }>(
      this.gradesUrl + '/course/' + courseId,
      { headers: this.getAuthHeaders() }
    );
  }

  // Récupérer la note d'un étudiant dans un cours
  getGradeByStudentAndCourse(studentId: string, courseId: string) {
    return this.httpClient.get<{ grade: any; msg?: string }>(
      this.gradesUrl + '/' + studentId + '/' + courseId,
      { headers: this.getAuthHeaders() }
    );
  }

  // Modifier une note
  updateGrade(id: string, newObj: any) {
    return this.httpClient.put<{ msg: string; grade: any }>(
      this.gradesUrl + '/' + id,
      newObj,
      { headers: this.getAuthHeaders() }
    );
  }

  // Supprimer une note
  deleteGrade(id: string) {
    return this.httpClient.delete<{ msg: string }>(
      this.gradesUrl + '/' + id,
      { headers: this.getAuthHeaders() }
    );
  }
}

