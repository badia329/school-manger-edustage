import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currentUser: any = null;
constructor(private router: Router) {}
  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    console.log(user);
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  logout() {
  localStorage.removeItem('currentUser'); 
  this.currentUser = null;                
  this.router.navigate(['']);      
}
}
