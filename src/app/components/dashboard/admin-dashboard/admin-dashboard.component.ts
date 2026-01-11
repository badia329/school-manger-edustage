import { Component } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../../services/courses.service';

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
  currentUser: any = [];
  selectedTeacherId: any = '';
  filteredCourses: any = [];
  selectedCourseId: any = '';

  constructor(private router: Router, private coursesService: CoursesService) {}
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
    this.coursesService.getAllCourses().subscribe((data: any) => {
      console.log('Here are all courses:', data);
      this.courses = data.tab;
    });
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
  onTeacherChange() {
    console.log('Selected Teacher ID:', this.selectedTeacherId);
    this.filteredCourses = [];
    for (let course of this.courses) {
      if (course.teacherId == this.selectedTeacherId) {
        this.filteredCourses.push(course);
      }
    }
    this.selectedCourseId = '';
  }
  // short way by fillter
  //   onTeacherChange() {
  //   this.filteredCourses = this.courses.filter((course: any) =>
  //     course.teacherId == this.selectedTeacherId
  //   );
  //   this.selectedCourseId = '';
  // }

  assignStudents() {
    if (this.selectedTeacherId === '' || this.selectedCourseId === '') {
      alert('Choose teacher and course');
      return;
    }

    let selectedStudents: any = [];

    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].selected === true) {
        selectedStudents.push(this.students[i].id);
      }
    }

    if (selectedStudents.length === 0) {
      alert('Choose at least one student');
      return;
    }

    let assignments = JSON.parse(
      localStorage.getItem('courseAssignments') || '[]'
    );

    let found = false;

    for (let i = 0; i < assignments.length; i++) {
      if (
        assignments[i].teacherId == this.selectedTeacherId &&
        assignments[i].courseId == this.selectedCourseId
      ) {
        for (let j = 0; j < selectedStudents.length; j++) {
          let exists = false;

          for (let k = 0; k < assignments[i].students.length; k++) {
            if (assignments[i].students[k] === selectedStudents[j]) {
              exists = true;
              break;
            }
          }

          if (!exists) {
            assignments[i].students.push(selectedStudents[j]);
          }
        }

        found = true;
        break;
      }
    }

    if (!found) {
      let newAssignment: any = {};
      newAssignment.teacherId = this.selectedTeacherId;
      newAssignment.courseId = this.selectedCourseId;
      newAssignment.students = selectedStudents;

      assignments.push(newAssignment);
    }

    localStorage.setItem('courseAssignments', JSON.stringify(assignments));

    // reset
    this.selectedTeacherId = '';
    this.selectedCourseId = '';

    for (let i = 0; i < this.students.length; i++) {
      this.students[i].selected = false;
    }

    alert('Assignment saved');
  }

  deleteAssignment(id: any) {}
}
