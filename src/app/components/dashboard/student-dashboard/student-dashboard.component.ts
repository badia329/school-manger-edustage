import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BannerComponent } from '../../banner/banner.component';
import { AssignmentService } from '../../../services/assignment.service';
import { GradeService } from '../../../services/grade.service';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, BannerComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  currentUser: any;
  myCourses: any = [];
  courseGrades: any = {};
  loading: boolean = true;

  constructor(
    private router: Router,
    private assignmentService: AssignmentService,
    private gradeService: GradeService
  ) {}

  ngOnInit() {
    // Get current user from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Student User:', this.currentUser);

    // Check if user is logged in and is a student
    if (!this.currentUser || !this.currentUser.userId || this.currentUser.role !== 'student') {
      console.log('Unauthorized access');
      this.router.navigate(['/login']);
      return;
    }

    // Get courses assigned to this student
    this.assignmentService.getCoursesByStudent(this.currentUser.userId)
      .subscribe({
        next: (data: any) => {
          console.log('Assignments:', data);
          this.myCourses = data.tab || [];
          this.loading = false;
          
          // Get grades for each course
          this.myCourses.forEach((assignment: any) => {
            this.getGradeForCourse(assignment.courseId._id);
          });
        },
        error: (err) => {
          console.error('Error loading courses:', err);
          this.loading = false;
        }
      });
  }

  // Get grade for a specific course
  getGradeForCourse(courseId: string) {
    this.gradeService.getGradeByStudentAndCourse(this.currentUser.userId, courseId)
      .subscribe({
        next: (data: any) => {
          console.log('Grade data:', data);
          if (data.grade) {
            this.courseGrades[courseId] = data.grade;
          }
        },
        error: (err) => {
          console.error('Error loading grade:', err);
        }
      });
  }

  // View course details
  viewCourse(course: any) {
    this.router.navigate(['/infoCourse', course._id || course.courseId?._id]);
  }

  // Get grade display
  getGrade(courseId: string): string {
    const grade = this.courseGrades[courseId];
    return grade ? `${grade.grade}/20 - ${grade.evaluation}` : 'Pas encore noté';
  }

  // Logout
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

