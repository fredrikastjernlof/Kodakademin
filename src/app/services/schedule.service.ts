import { Injectable, computed, signal } from '@angular/core';
import { Course } from '../models/course.model';



@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private storageKey = 'kodakademin-schedule';

  // Stores courses selected by the user.
  private courses = signal<Course[]>(this.loadFromStorage());

  // Readonly signal for components.
  readonly selectedCourses = this.courses.asReadonly();

  // Calculates total credits for the selected courses.
  readonly totalPoints = computed(() =>
    this.courses().reduce((sum, course) => sum + course.points, 0)
  );

  // Adds a course to the schedule if it's not already selected.
  addCourse(course: Course): void {
    const alreadyExists = this.courses().some(
      selectedCourse => selectedCourse.courseCode === course.courseCode
    );

    if (alreadyExists) {
      return;
    }

    this.courses.update(currentCourses => [...currentCourses, course]);
    this.saveToStorage();
  }

  // Removes a course from the schedule based on its course code.
  removeCourse(courseCode: string): void {
    this.courses.update(currentCourses =>
      currentCourses.filter(course => course.courseCode !== courseCode)
    );

    this.saveToStorage();
  }

  // Checks if a course is already selected in the schedule.
  isCourseSelected(courseCode: string): boolean {
    return this.courses().some(course => course.courseCode === courseCode);
  }

  // Saves the current schedule to local storage.
  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.courses()));
  }

  // Loads the schedule from local storage, returning an empty array if no data is found.
  private loadFromStorage(): Course[] {
    const storedCourses = localStorage.getItem(this.storageKey);

    if (!storedCourses) {
      return [];
    }

    return JSON.parse(storedCourses);
  }
}
