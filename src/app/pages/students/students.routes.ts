import { Route } from "@angular/router";
import { StudentsMainComponent } from "./students-main/students-main.component";
import { StudentsSidebarComponent } from "./students-sidebar/students-sidebar.component";

export default [
    {
        path: '',
        component: StudentsMainComponent,
    },
    {
        path: '',
        component: StudentsSidebarComponent,
        outlet: 'sidebar',
    },
  ] as Route[];