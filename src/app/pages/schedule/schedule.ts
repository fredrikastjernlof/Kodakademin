import { Component, inject } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-schedule',
  imports: [ RouterLink ],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss',
})
export class Schedule {
  // Inject the ScheduleService to access selected courses and total points
  private scheduleService = inject(ScheduleService);

  // Readonly signals for selected courses and total points from the ScheduleService
  selectedCourses = this.scheduleService.selectedCourses;
  totalPoints = this.scheduleService.totalPoints;

  // Method to remove a course from the schedule using the ScheduleService
  removeCourse(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
  }
}
