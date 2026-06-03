import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule-summary',
  imports: [RouterLink],
  templateUrl: './schedule-summary.html',
  styleUrl: './schedule-summary.scss',
})
export class ScheduleSummary {

  private scheduleService = inject(ScheduleService);

  // Controls whether all selected courses or only the latest ones are shown
  showAllCourses = signal(false);

  // Displays all courses when expanded or show the 3 most recently selected courses
  visibleCourses = computed(() => {
    if (this.showAllCourses()) {
      return this.selectedCourses();
    }

    return this.selectedCourses().slice(-3).reverse();
  });

  // Number of hidden courses when the list is collapsed
  hiddenCourseCount = computed(() =>
    Math.max(this.selectedCourses().length - 3, 0)
  );

  // Toggles between expanded and collapsed course list
  toggleCourseList(): void {
    this.showAllCourses.update(showAll => !showAll);
  }

  // Reactive data provided by the ScheduleService
  selectedCourses = this.scheduleService.selectedCourses;
  totalPoints = this.scheduleService.totalPoints;

  // Removes a course from the user's schedule
  removeCourse(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
  }
}