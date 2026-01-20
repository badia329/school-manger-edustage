import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [BannerComponent, CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent {
  currentUser: any;
  allCourses: any = [];
  allStudents: any = [];
  courseAssignments: any = [];
  myCourses: any = [];
  loading: boolean = true;

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private httpClient: HttpClient
  ) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  ngOnInit() {
    // Get current user from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Current User:', this.currentUser);

    // Check if user is logged in
    if (!this.currentUser || !this.currentUser.userId) {
      console.log('User not logged in, redirecting to login...');
      this.router.navigate(['/login']);
      return;
    }

    this.loadData();
  }

  loadData() {
    this.loading = true;

    // Load all courses and get teacher's courses
    this.coursesService.getAllCourses().subscribe({
      next: (data: any) => {
        console.log('Data from Backend:', data);
        this.allCourses = data.tab || [];
        
        // Filter courses by current teacher
        this.myCourses = this.allCourses.filter((course: any) => 
          course.teacherId === this.currentUser.userId || 
          course.teacherId?._id === this.currentUser.userId
        );

        // Add students array to each course
        this.myCourses.forEach((course: any) => {
          course.students = [];
        });

        // Now load assignments to get students per course
        this.loadAssignments();
      },
      error: (err) => {
        console.error('Error loading courses:', err);
        this.loading = false;
      }
    });
  }

  loadAssignments() {
    // Load assignments to get students enrolled in each course
    this.httpClient.get<any>(
      'http://localhost:5206/assignments',
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (data) => {
        const assignments = data.tab || [];
        
        // Load all students
        this.httpClient.get<any>(
          'http://localhost:5206/students',
          { headers: this.getAuthHeaders() }
        ).subscribe({
          next: (studentsData) => {
            this.allStudents = studentsData.tab || [];
            
            // Match students with assignments for each course
            this.myCourses.forEach((course: any) => {
              // Find assignments for this course
              const courseAssignments = assignments.filter((a: any) => 
                a.courseId?._id === course._id || a.courseId === course._id
              );

              // Get student IDs from assignments
              const studentIds = courseAssignments.map((a: any) => 
                a.studentId?._id || a.studentId
              );

              // Find matching students
              course.students = this.allStudents.filter((s: any) => 
                studentIds.includes(s._id) || studentIds.includes(s.userId?._id)
              );

              console.log(`Course ${course.name}: ${course.students.length} students`);
            });

            this.loading = false;
          },
          error: (err) => {
            console.error('Error loading students:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error loading assignments:', err);
        this.loading = false;
      }
    });
  }

  // Navigate to add course page
  goToAddCourse() {
    this.router.navigate(['/addCourse']);
  }

  // View course details
  viewCourse(courseId: any) {
    this.router.navigate(['/infoCourse', courseId]);
  }

  // Edit course
  editCourse(courseId: any) {
    this.router.navigate(['/editCourse', courseId]);
  }

  // Delete course
  deleteCourse(courseId: any) {
    // Confirm before delete
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.deleteCourse(courseId).subscribe({
        next: (data: any) => {
          console.log('Course deleted:', data);
          // Remove from local array
          this.myCourses = this.myCourses.filter((c: any) => c._id !== courseId);
          alert('Course deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting course:', err);
          alert('Error deleting course');
        }
      });
    }
  }

  // Give grade and evaluation to student
  giveGradeAndEvaluation(studentId: any, courseId: any) {
    // Get student user ID
    const student = this.allStudents.find((s: any) => s._id === studentId || s.userId?._id === studentId);
    const studentUserId = student?.userId?._id || student?.userId || studentId;
    
    // Navigate to grade page with student and course IDs
    this.router.navigate(['/grade', courseId, studentUserId]);
    console.log('Give grade to student:', studentUserId, 'in course:', courseId);
  }

  // Get student name helper
  getStudentName(student: any): string {
    if (student.userId) {
      return `${student.userId.firstName} ${student.userId.lastName}`;
    }
    return `${student.firstName} ${student.lastName}`;
  }

  // Get student email helper
  getStudentEmail(student: any): string {
    if (student.userId) {
      return student.userId.email;
    }
    return student.email;
  }

  // Get student phone helper
  getStudentPhone(student: any): string {
    if (student.userId) {
      return student.userId.tel;
    }
    return student.tel || 'N/A';
  }
}
