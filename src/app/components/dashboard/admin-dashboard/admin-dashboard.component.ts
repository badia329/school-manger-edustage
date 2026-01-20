import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../../services/courses.service';
import { AdminService } from '../../../services/admin.service';
import { StudentService } from '../../../services/student.service';
import { AssignmentService } from '../../../services/assignment.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [BannerComponent, CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  teachers: any = [];
  students: any = [];
  courses: any = [];
  currentUser: any = {};
  stats: any = {};
  loading: boolean = true;

  // Assignment variables
  selectedTeacherId: string = '';
  filteredCourses: any = [];
  selectedCourseId: string = '';
  selectedStudents: string[] = [];

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private adminService: AdminService,
    private studentService: StudentService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Check if user is admin
    if (!this.currentUser || !this.currentUser.userId || this.currentUser.role !== 'admin') {
      console.log('Unauthorized access');
      this.router.navigate(['/login']);
      return;
    }

    this.loadData();
  }

  loadData() {
    this.loading = true;

    // Load all data in parallel
    Promise.all([
      this.loadTeachers(),
      this.loadStudents(),
      this.loadCourses(),
      this.loadStats()
    ]).then(() => {
      this.loading = false;
    }).catch((err) => {
      console.error('Error loading data:', err);
      this.loading = false;
    });
  }

  loadTeachers(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.adminService.getAllTeachers().subscribe({
        next: (data: any) => {
          this.teachers = data.tab || [];
          resolve();
        },
        error: (err) => {
          console.error('Error loading teachers:', err);
          reject(err);
        }
      });
    });
  }

  loadStudents(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.studentService.getAllStudent().subscribe({
        next: (data: any) => {
          this.students = data.tab || [];
          resolve();
        },
        error: (err) => {
          console.error('Error loading students:', err);
          reject(err);
        }
      });
    });
  }

  loadCourses(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.coursesService.getAllCourses().subscribe({
        next: (data: any) => {
          this.courses = data.tab || [];
          resolve();
        },
        error: (err) => {
          console.error('Error loading courses:', err);
          reject(err);
        }
      });
    });
  }

  loadStats(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.adminService.getStats().subscribe({
        next: (data: any) => {
          this.stats = data;
          resolve();
        },
        error: (err) => {
          console.error('Error loading stats:', err);
          reject(err);
        }
      });
    });
  }

  validateTeacher(teacherId: string) {
    if (confirm('Are you sure you want to validate this teacher?')) {
      this.adminService.validateTeacher(teacherId).subscribe({
        next: (data: any) => {
          console.log('Teacher validated:', data);
          this.loadTeachers();
          alert('Teacher validated successfully!');
        },
        error: (err) => {
          console.error('Error validating teacher:', err);
          alert('Error validating teacher');
        }
      });
    }
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.adminService.deleteUser(userId).subscribe({
        next: (data: any) => {
          console.log('User deleted:', data);
          this.loadData();
          alert('User deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Error deleting user');
        }
      });
    }
  }

  getTeacherName(teacherId: any): string {
    if (!teacherId) return 'Unknown Teacher';
    
    // Handle populated teacher object
    if (typeof teacherId === 'object') {
      return teacherId.firstName + ' ' + teacherId.lastName;
    }

    // Find by ID
    const teacher = this.teachers.find((t: any) => t._id === teacherId || t.id === teacherId);
    return teacher ? (teacher.firstName + ' ' + teacher.lastName) : 'Unknown Teacher';
  }

  infoCourse(courseId: string) {
    this.router.navigate(['/infoCourse', courseId]);
  }

  onTeacherChange() {
    console.log('Selected Teacher ID:', this.selectedTeacherId);
    this.filteredCourses = [];
    this.selectedCourseId = '';

    // Filter courses by teacher
    this.filteredCourses = this.courses.filter((course: any) => 
      course.teacherId === this.selectedTeacherId || 
      course.teacherId?._id === this.selectedTeacherId
    );
  }

  toggleStudentSelection(studentId: string) {
    const index = this.selectedStudents.indexOf(studentId);
    if (index > -1) {
      this.selectedStudents.splice(index, 1);
    } else {
      this.selectedStudents.push(studentId);
    }
  }

  isStudentSelected(studentId: string): boolean {
    return this.selectedStudents.includes(studentId);
  }

  assignStudents() {
    if (this.selectedTeacherId === '' || this.selectedCourseId === '') {
      alert('Please select both teacher and course');
      return;
    }

    if (this.selectedStudents.length === 0) {
      alert('Please select at least one student');
      return;
    }

    const assignmentObj = {
      teacherId: this.selectedTeacherId,
      courseId: this.selectedCourseId,
      students: this.selectedStudents
    };

    this.assignmentService.assignStudent(assignmentObj).subscribe({
      next: (data: any) => {
        console.log('Assignment created:', data);
        alert('Students assigned successfully!');
        
        // Reset form
        this.selectedTeacherId = '';
        this.selectedCourseId = '';
        this.filteredCourses = [];
        this.selectedStudents = [];
      },
      error: (err) => {
        console.error('Error assigning students:', err);
        alert('Error assigning students');
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

