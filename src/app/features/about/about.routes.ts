import { Route } from "@angular/router";
import { AboutMainComponent } from "./components/about-main/about-main.component";
import { AboutSidebarComponent } from "./components/about-sidebar/about-sidebar.component";

export const ABOUT_ROUTES: Route[] = [
    {
        path: '',
        component: AboutMainComponent,
      },
      {
        path: '',
        component: AboutSidebarComponent,
        outlet: 'sidebar',
      },
  ];