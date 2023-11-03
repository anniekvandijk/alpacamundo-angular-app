import { Route } from "@angular/router";
import { AboutMainComponent } from "./about-main/about-main.component";
import { AboutSidebarComponent } from "./about-sidebar/about-sidebar.component";

export default [
    {
        path: '',
        component: AboutMainComponent,
      },
      {
        path: '',
        component: AboutSidebarComponent,
        outlet: 'sidebar',
      },
  ] as Route[];