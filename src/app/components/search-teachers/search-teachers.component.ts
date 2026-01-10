import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-search-teachers',
  imports: [CommonModule, BannerComponent, FormsModule],
  templateUrl: './search-teachers.component.html',
  styleUrl: './search-teachers.component.css'
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
