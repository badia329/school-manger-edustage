import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-grade',
  imports: [CommonModule, FormsModule],
  templateUrl: './grade.component.html',
  styleUrl: './grade.component.css'
})
export class GradeComponent {
  courseId: any;
  studentId: any;
  course: any = null;
  student: any = null;

  grade: number = 0;
  evaluation: string = '';

  existingGrade: any = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.studentId = this.route.snapshot.paramMap.get('studentId');
    this.loadData();
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  loadData() {
    this.loading = true;

    // Load course
    this.httpClient.get<{ tab: any }>(
      `http://localhost:5206/courses/${this.courseId}`,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (data) => {
        this.course = data.tab;
        this.loadStudent();
      },
      error: (err: any) => {
        console.error('Error loading course:', err);
        this.loading = false;
      }
    });
  }

  loadStudent() {
    // Load student by user ID
    this.httpClient.get<{ tab: any }>(
      `http://localhost:5206/students/user/${this.studentId}`,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (data) => {
        this.student = data.tab;
        this.loadExistingGrade();
      },
      error: (err: any) => {
        console.error('Error loading student:', err);
        this.loading = false;
      }
    });
  }

  loadExistingGrade() {
    // Check if grade already exists using grades endpoint
    this.httpClient.get<any>(
      `http://localhost:5206/grades/${this.studentId}/${this.courseId}`,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (data) => {
        if (data.grade) {
          this.existingGrade = data.grade;
          this.grade = data.grade.grade;
          this.evaluation = data.grade.evaluation;
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.log('No existing grade found');
        this.loading = false;
      }
    });
  }

  saveGrade() {
    if (this.grade < 0 || this.grade > 20) {
      alert('La note doit être entre 0 et 20!');
      return;
    }

    if (!this.evaluation || this.evaluation.trim() === '') {
      alert('Veuillez ajouter une évaluation!');
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const gradeData = {
      studentId: this.studentId,
      courseId: this.courseId,
      teacherId: currentUser.userId || currentUser.id,
      grade: this.grade,
      evaluation: this.evaluation,
      date: new Date().toISOString()
    };

    if (this.existingGrade) {
      // Update existing grade
      this.httpClient.put<any>(
        `http://localhost:5206/grades/${this.existingGrade._id}`,
        gradeData,
        { headers: this.getAuthHeaders() }
      ).subscribe({
        next: (data: any) => {
          console.log('Grade updated:', data);
          alert('Grade updated successfully!');
          this.router.navigate(['/dashboardTeacher']);
        },
        error: (err: any) => {
          console.error('Error updating grade:', err);
          alert('Error updating grade');
        }
      });
    } else {
      // Add new grade
      this.httpClient.post<any>(
        `http://localhost:5206/grades`,
        gradeData,
        { headers: this.getAuthHeaders() }
      ).subscribe({
        next: (data: any) => {
          console.log('Grade added:', data);
          alert('Grade and evaluation recorded successfully!');
          this.router.navigate(['/dashboardTeacher']);
        },
        error: (err: any) => {
          console.error('Error adding grade:', err);
          alert('Error recording grade');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboardTeacher']);
  }
}


