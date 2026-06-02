import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);

  // Stores all courses loaded from the JSON file.
  private courses = signal<Course[]>([]);

  // Readonly signal used by components.
  readonly allCourses = this.courses.asReadonly();

  loadCourses(): void {
    this.http.get<Course[]>('/miun_courses.json').subscribe({
      next: (data) => {
        this.courses.set(data);
      },
      error: (error) => {
        console.error('Could not load courses:', error);
      }
    });
  }
}
