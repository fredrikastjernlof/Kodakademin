import { Component, inject, computed, signal } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ScheduleService } from '../../services/schedule.service';
import { Course } from '../../models/course.model';
import { ScheduleSummary } from '../../components/schedule-summary/schedule-summary';

@Component({
  selector: 'app-courses',
  imports: [ScheduleSummary],
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

  // Signals to manage how many courses to show
  baseVisibleCourseCount = signal(20);
  visibleCourseCount = signal(20);

  // Computed signal to filter and sort courses based on user input
  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const subject = this.selectedSubject();
    const sortBy = this.sortField();
    const direction = this.sortDirection();

    // Filter courses based on search term and selected subject
    const filtered = this.courses().filter(course => {
      const courseName = course.courseName.toLowerCase();
      const courseCode = course.courseCode.toLowerCase();

      const matchesSearch =
        !search ||
        courseName.includes(search) ||
        courseCode.includes(search);

      const matchesSubject =
        !subject || course.subject === subject;

      return matchesSearch && matchesSubject;
    });

    // Sort the filtered courses based on search relevance first, then selected sort field
    return [...filtered].sort((a, b) => {
      let result = 0;

      if (search) {
        const aName = a.courseName.toLowerCase();
        const aCode = a.courseCode.toLowerCase();
        const bName = b.courseName.toLowerCase();
        const bCode = b.courseCode.toLowerCase();

        const aStartsWithSearch =
          aName.startsWith(search) || aCode.startsWith(search);

        const bStartsWithSearch =
          bName.startsWith(search) || bCode.startsWith(search);

        if (aStartsWithSearch && !bStartsWithSearch) {
          return -1;
        }

        if (!aStartsWithSearch && bStartsWithSearch) {
          return 1;
        }
      }

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

      return direction === 'asc' ? result : -result;
    });
  });

  // Computed signal for the currently visible courses
  displayedCourses = computed(() =>
    this.filteredCourses().slice(0, this.visibleCourseCount())
  );

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

  // Method to update the base number of visible courses
  updateBaseVisibleCourseCount(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedCount = Number(select.value);

    this.baseVisibleCourseCount.set(selectedCount);
    this.visibleCourseCount.set(selectedCount);
  }

  // Method to show more courses
  showMoreCourses(): void {
    this.visibleCourseCount.update(count => count + 20);
  }

  // Method to show fewer courses
  showFewerCourses(): void {
    this.visibleCourseCount.set(this.baseVisibleCourseCount());
  }
}
