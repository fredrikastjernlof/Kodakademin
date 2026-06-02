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

  // Signals for search term and selected subject
  searchTerm = signal('');
  selectedSubject = signal('');

  // Computed signal to filter courses based on search term and selected subject
  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const subject = this.selectedSubject();

    return this.courses().filter(course => {
      const matchesSearch =
        course.courseName.toLowerCase().includes(search) ||
        course.courseCode.toLowerCase().includes(search);

      const matchesSubject =
        !subject || course.subject === subject;

      return matchesSearch && matchesSubject;
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
}
