import { Component, inject } from '@angular/core';
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

  // Load courses when the component is initialized
  constructor() {
    this.courseService.loadCourses();
  }
}
