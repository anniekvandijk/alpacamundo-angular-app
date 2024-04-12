import { Route } from "@angular/router";
import { HomeSidebarComponent } from "./features/home-sidebar/home-sidebar.component";
import { HomeMainComponent } from "./features/home-main/home-main.component";

export const HOME_ROUTES: Route[] = [
    {
        path: '',
        component: HomeMainComponent,
      },
      {
        path: '',
        component: HomeSidebarComponent,
        outlet: 'sidebar',
      },
  ];