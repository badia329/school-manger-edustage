import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.studentId = this.route.snapshot.paramMap.get('studentId');
    this.loadData();
  }

  loadData() {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const students = JSON.parse(localStorage.getItem('users') || '[]');
    const grades = JSON.parse(localStorage.getItem('grades') || '[]');

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].idCourse == this.courseId) {
        this.course = courses[i];
        break;
      }
    }

    for (let i = 0; i < students.length; i++) {
      if (students[i].id == this.studentId) {
        this.student = students[i];
        break;
      }
    }

    for (let i = 0; i < grades.length; i++) {
      if (grades[i].courseId == this.courseId && grades[i].studentId == this.studentId) {
        this.existingGrade = grades[i];
        this.grade = grades[i].grade;
        this.evaluation = grades[i].evaluation;
        break;
      }
    }
  }

  saveGrade() {
    if (this.grade < 0 || this.grade > 20) {
      alert('La note doit être entre 0 et 20!');
      return;
    }

    let empty = true;
    for (let i = 0; i < this.evaluation.length; i++) {
      if (this.evaluation[i] !== ' ') {
        empty = false;
        break;
      }
    }

    if (empty) {
      alert('Veuillez ajouter une évaluation!');
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const grades = JSON.parse(localStorage.getItem('grades') || '[]');

    const gradeData = {
      id: this.existingGrade ? this.existingGrade.id : Date.now(),
      courseId: this.courseId,
      studentId: this.studentId,
      teacherId: currentUser.id,
      grade: this.grade,
      evaluation: this.evaluation,
      date: new Date().toISOString()
    };

    let updated = false;
    for (let i = 0; i < grades.length; i++) {
      if (this.existingGrade && grades[i].id === this.existingGrade.id) {
        grades[i] = gradeData;
        updated = true;
        break;
      }
    }

    if (!updated) {
      grades.push(gradeData);
    }

    localStorage.setItem('grades', JSON.stringify(grades));
    alert('Rating and review successfully recorded!');
    this.router.navigate(['dashboardTeacher']);
  }

  goBack() {
    this.router.navigate(['/dashboardTeacher']);
  }
}


