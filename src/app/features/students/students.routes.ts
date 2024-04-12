import { Route } from "@angular/router";
import { StudentsMainComponent } from "./features/students-main/students-main.component";
import { StudentsSidebarComponent } from "./features/students-sidebar/students-sidebar.component";

export const STUDENTS_ROUTES: Route[] = 
[
    {
        path: '',
        component: StudentsMainComponent,
    },
    {
        path: '',
        component: StudentsSidebarComponent,
        outlet: 'sidebar',
    },
  ];