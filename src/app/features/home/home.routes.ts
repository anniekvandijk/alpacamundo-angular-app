import { Route } from "@angular/router";
import { HomeSidebarComponent } from "./home-sidebar/home-sidebar.component";
import { HomeMainComponent } from "./home-main/home-main.component";

export default [
    {
        path: '',
        component: HomeMainComponent,
      },
      {
        path: '',
        component: HomeSidebarComponent,
        outlet: 'sidebar',
      },
  ] as Route[];