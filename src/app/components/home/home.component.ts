import { Component } from '@angular/core';
import { StartComponent } from '../start/start.component';
import { AwsomefeatureComponent } from '../awsomefeature/awsomefeature.component';
import { CoursesComponent } from '../courses/courses.component';
import { TrainerComponent } from '../trainer/trainer.component';
import { EventsComponent } from '../events/events.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  imports: [StartComponent,AwsomefeatureComponent,CoursesComponent, TrainerComponent,EventsComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
