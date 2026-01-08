import { Component } from '@angular/core';
import { TrainerComponent } from "../trainer/trainer.component";
import { BannerComponent } from "../banner/banner.component";

@Component({
  selector: 'app-teachers',
  imports: [TrainerComponent, BannerComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

}
