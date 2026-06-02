import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Courses } from './pages/courses/courses';
import { Schedule } from './pages/schedule/schedule';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'startsida', component: Home },
  { path: 'kurser', component: Courses },
  { path: 'ramschema', component: Schedule },
  { path: "404", component: NotFound},
  { path: "**", redirectTo: "404", pathMatch: "full"}
];
