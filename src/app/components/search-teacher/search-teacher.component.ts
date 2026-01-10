import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-teacher',
  imports: [BannerComponent, FormsModule, CommonModule],
  templateUrl: './search-teacher.component.html',
  styleUrl: './search-teacher.component.css',
})
export class SearchTeacherComponent {
  users: any = [];
  filteredTeachers: any = [];
  isSearched: boolean = false;

  constructor() {}

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  search(f: NgForm) {
    const teachers = [];

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].role === "teacher") {
        teachers.push(this.users[i]);
      }
    }

    this.isSearched = true;
    const specialtyToSearch = f.value.specialty?.toLowerCase() || '';
    this.filteredTeachers = [];

    for (let i = 0; i < teachers.length; i++) {
      const teacher = teachers[i];
      if (teacher.specialty?.toLowerCase().includes(specialtyToSearch)) {
        this.filteredTeachers.push(teacher);
      }
    }
  }
}

