import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search-teachers',
  imports: [CommonModule, BannerComponent, FormsModule],
  templateUrl: './search-teachers.component.html',
  styleUrl: './search-teachers.component.css'
})

export class SearchTeacherComponent {
  allTeachers: any = [];
  filteredTeachers: any = [];
  isSearched: boolean = false;
  loading: boolean = false;
  error: string = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.loadAllTeachers();
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  loadAllTeachers() {
    this.loading = true;
    this.httpClient.get<{ tab: any; nbr: number }>(
      'http://localhost:5206/teachers',
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (data) => {
        this.allTeachers = data.tab || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading teachers:', err);
        this.error = 'Failed to load teachers';
        this.loading = false;
      }
    });
  }

  search(f: NgForm) {
    this.isSearched = true;
    const specialtyToSearch = f.value.specialty?.toLowerCase() || '';

    this.filteredTeachers = this.allTeachers.filter((teacher: any) => {
      const specialty = teacher.speciality || teacher.specialty || '';
      return specialty.toLowerCase().includes(specialtyToSearch);
    });
  }
}
