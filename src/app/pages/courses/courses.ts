import { Component, inject, computed, signal } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {

  // Inject the CourseService using Angular's dependency injection
  private courseService = inject(CourseService);

  // Update courses when the service data changes
  courses = this.courseService.allCourses;

  // Signal to hold the current search term
  searchTerm = signal('');

  // Computed signal to filter courses based on the search term
  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();

    return this.courses().filter(course =>
      course.courseName.toLowerCase().includes(search) ||
      course.courseCode.toLowerCase().includes(search)
    );
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
}
