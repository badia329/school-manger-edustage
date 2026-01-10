import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-parent-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './parent-dashboard.component.html',
  styleUrl: './parent-dashboard.component.css',
})
export class ParentDashboardComponent {
  users: any = [];
  courses: any = [];
  courseAssignments: any = [];
  grades: any = [];
  isSearched: boolean = false;
  selectedChild: any = null;
  childCourses: any = [];

  constructor() {}

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    this.courses = JSON.parse(localStorage.getItem('courses') || '[]');
    this.courseAssignments = JSON.parse(
      localStorage.getItem('courseAssignments') || '[]'
    );
    this.grades = JSON.parse(localStorage.getItem('grades') || '[]');
  }

  search(f: NgForm) {
    this.isSearched = true;
    const childNumber = f.value.childNumber || '';
    this.selectedChild = null;
    this.childCourses = [];

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].role === 'student' && this.users[i].tel == childNumber) {
        this.selectedChild = this.users[i];
        this.loadChildCourses(this.users[i].id);
        break;
      }
    }
  }

  loadChildCourses(studentId: string) {
    this.childCourses = [];

    for (let i = 0; i < this.courseAssignments.length; i++) {
      const assignment = this.courseAssignments[i];

      if (assignment.students && assignment.students.includes(studentId)) {

        let courseName = 'Unknown';
        for (let j = 0; j < this.courses.length; j++) {
          if (this.courses[j].idCourse == assignment.courseId) {
            courseName = this.courses[j].name;
            break;
          }
        }

        let teacherName = 'Unknown';
        for (let j = 0; j < this.users.length; j++) {
          if (this.users[j].id == assignment.teacherId) {
            teacherName = this.users[j].firstName + ' ' + this.users[j].lastName;
            break;
          }
        }

        let gradeValue = 'N/A';
        let evaluationValue = 'No evaluation yet';
        for (let j = 0; j < this.grades.length; j++) {
          const g = this.grades[j];
          if (g.studentId == studentId && g.courseId == assignment.courseId) {
            gradeValue = g.grade;
            evaluationValue = g.evaluation;
            break;
          }
        }

        this.childCourses.push({
          ...assignment,
          courseName,
          teacherName,
          grade: gradeValue,
          evaluation: evaluationValue
        });
      }
    }
  }
}
