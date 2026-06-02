import { Component, inject, computed, signal } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ScheduleService } from '../../services/schedule.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {

  // Inject the CourseService and ScheduleService to access course data and manage the schedule
  private courseService = inject(CourseService);
  private scheduleService = inject(ScheduleService);

  // Update courses when the service data changes
  courses = this.courseService.allCourses;

  // Signals to manage search term, selected subject, sort field, and sort direction
  searchTerm = signal('');
  selectedSubject = signal('');
  sortField = signal<'courseName' | 'courseCode' | 'points' | 'subject'>('courseName');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Computed signal to filter and sort courses based on user input
  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const subject = this.selectedSubject();
    const sortBy = this.sortField();
    const direction = this.sortDirection();

    // Filter courses based on search term and selected subject
    const filtered = this.courses().filter(course => {
      const matchesSearch =
        course.courseName.toLowerCase().includes(search) ||
        course.courseCode.toLowerCase().includes(search);

      const matchesSubject =
        !subject || course.subject === subject;

      return matchesSearch && matchesSubject;
    });

    // Sort the filtered courses based on the selected sort field and direction
    return [...filtered].sort((a, b) => {
      let result = 0;

      switch (sortBy) {
        case 'courseCode':
          result = a.courseCode.localeCompare(b.courseCode);
          break;

        case 'points':
          result = a.points - b.points;
          break;

        case 'subject':
          result = a.subject.localeCompare(b.subject);
          break;

        default:
          result = a.courseName.localeCompare(b.courseName);
      }

      // Reverse the result if the sort direction is descending
      return direction === 'asc' ? result : -result;
    });
  });


  // Computed signal to get unique subjects from the courses
  subjects = computed(() => {
    const uniqueSubjects = [
      ...new Set(this.courses().map(course => course.subject))
    ];

    return uniqueSubjects.sort();
  });

  // Load courses when the component is initialized
  constructor() {
    this.courseService.loadCourses();
  }

  // Method to update the search term based on user input
  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  // Method to update the selected subject based on user selection
  updateSubject(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSubject.set(select.value);
  }

  // Method to update the sort field and toggle sort direction when the same field is selected again
  updateSort(field: 'courseName' | 'courseCode' | 'points' | 'subject'): void {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
      return;
    }

    this.sortField.set(field);
    this.sortDirection.set('asc');
  }

  // Method to update the sort field from a select dropdown
  updateSortFromSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const field = select.value as 'courseName' | 'courseCode' | 'points' | 'subject';

    this.sortField.set(field);
  }
  // Method to toggle the sort direction between ascending and descending
  toggleSortDirection(): void {
    this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
  }

  // Method to add a course to the schedule using the ScheduleService
  addToSchedule(course: Course): void {
    this.scheduleService.addCourse(course);
  }

  // Method to check if a course is already selected in the schedule
  isSelected(courseCode: string): boolean {
    return this.scheduleService.isCourseSelected(courseCode);
  }
}
