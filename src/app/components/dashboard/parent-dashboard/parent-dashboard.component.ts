import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerComponent } from '../../banner/banner.component';
import { AssignmentService } from '../../../services/assignment.service';
import { GradeService } from '../../../services/grade.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-parent-dashboard',
  imports: [FormsModule, CommonModule, BannerComponent],
  templateUrl: './parent-dashboard.component.html',
  styleUrl: './parent-dashboard.component.css',
})
export class ParentDashboardComponent {
  currentUser: any;
  childId: string = '';
  selectedChild: any = null;
  childCourses: any = [];
  childGrades: any = {};
  isSearched: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private assignmentService: AssignmentService,
    private gradeService: GradeService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    // Get current parent from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Parent User:', this.currentUser);

    // Check if user is logged in and is a parent
    if (!this.currentUser || !this.currentUser.userId || this.currentUser.role !== 'parent') {
      console.log('Unauthorized access');
      this.router.navigate(['/login']);
      return;
    }
  }

  search(f: NgForm) {
    this.isSearched = true;
    this.loading = true;
    this.errorMessage = '';
    this.childCourses = [];
    this.childGrades = {};

    const childPhone = f.value.childPhone || '';

    if (!childPhone) {
      this.errorMessage = 'Veuillez entrer le numéro de téléphone de votre enfant';
      this.loading = false;
      return;
    }

    // First, find the student by phone number
    this.studentService.getAllStudent().subscribe({
      next: (students: any) => {
        const student = students.tab?.find((s: any) => s.tel === childPhone);
        
        if (!student) {
          this.errorMessage = 'Aucun étudiant trouvé avec ce numéro de téléphone';
          this.loading = false;
          return;
        }

        this.selectedChild = student;
        this.childId = student._id;
        this.loadChildCourses(this.childId);
      },
      error: (err: any) => {
        console.error('Error finding student:', err);
        this.errorMessage = 'Erreur lors de la recherche de l\'étudiant';
        this.loading = false;
      }
    });
  }

  loadChildCourses(studentId: string) {
    this.loading = true;

    this.assignmentService.getCoursesByStudent(studentId).subscribe({
      next: (data: any) => {
        console.log('Child courses:', data);
        this.childCourses = data.tab || [];
        this.loading = false;

        // Load grades for each course
        this.childCourses.forEach((assignment: any) => {
          const courseId = assignment.courseId?._id || assignment.courseId;
          if (courseId) {
            this.loadGradeForCourse(studentId, courseId);
          }
        });
      },
      error: (err) => {
        console.error('Error loading courses:', err);
        this.errorMessage = 'Erreur lors du chargement des cours';
        this.loading = false;
      }
    });
  }

  loadGradeForCourse(studentId: string, courseId: string) {
    this.gradeService.getGradeByStudentAndCourse(studentId, courseId).subscribe({
      next: (data: any) => {
        if (data.grade) {
          this.childGrades[courseId] = data.grade;
        }
      },
      error: (err) => {
        console.error('Error loading grade:', err);
      }
    });
  }

  getGrade(courseId: string): string {
    const grade = this.childGrades[courseId];
    return grade ? `${grade.grade}/20 - ${grade.evaluation}` : 'Pas encore noté';
  }

  viewCourse(course: any) {
    const courseId = course.courseId?._id || course.courseId;
    this.router.navigate(['/infoCourse', courseId]);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

