import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [BannerComponent, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  teachers: any = [];
  students: any = [];
  courses: any = [];
  currentUser: any = [];

  constructor(private router: Router) {}
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const usersTab = JSON.parse(localStorage.getItem('users') || '[]');
    this.teachers = [];
    this.students = [];
    for (let i = 0; i < usersTab.length; i++) {
      if (usersTab[i].role === 'teacher') {
        this.teachers.push(usersTab[i]);
      } else if (usersTab[i].role === 'student') {
        this.students.push(usersTab[i]);
      }
    }
    this.courses = JSON.parse(localStorage.getItem('courses') || '[]');
  }
  validateTeacher(id: number) {
    const usersTab = JSON.parse(localStorage.getItem('users') || '[]');

    for (let i = 0; i < usersTab.length; i++) {
      if (usersTab[i].id === id) {
        usersTab[i].isValidated = true;
        break;
      }
    }

    localStorage.setItem('users', JSON.stringify(usersTab));

    this.ngOnInit();

    console.log('Teacher validated successfully!');
  }
  deleteUser(id: number) {
    const usersTab = JSON.parse(localStorage.getItem('users') || '[]');
    for (let i = 0; i < usersTab.length; i++) {
      if (usersTab[i].id === id) {
        usersTab.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('users', JSON.stringify(usersTab));
    this.ngOnInit();
    console.log('Success delete and UI refreshed');
  }
  getTeacherName(teacherId: any): string {
    console.log('course.teacherId', teacherId);
    console.log('teachers', this.teachers);

    for (let i = 0; i < this.teachers.length; i++) {
      if (this.teachers[i].id == teacherId) {
        return this.teachers[i].firstName + ' ' + this.teachers[i].lastName;
      }
    }
    return 'Unknown Teacher';
  }
  infoCourse(id: number) {
    this.router.navigate(['/infoCourse', id]);
  }
}
