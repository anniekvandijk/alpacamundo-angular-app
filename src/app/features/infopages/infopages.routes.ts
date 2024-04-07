import { Route } from "@angular/router";
import { InfopagesListComponent } from "./infopages-list/infopages-list.component";
import { InfopagesSidebarComponent } from "./infopages-sidebar/infopages-sidebar.component";
import { InfopagesDetailsComponent } from "./infopages-details/infopages-details.component";

export const INFOPAGE_ROUTES: Route[] = [
    {
        path: '',
        component: InfopagesListComponent,
    },
    {
        path: '',
        component: InfopagesSidebarComponent,
        outlet: 'sidebar',
    },
    {
        path: 'detail/:id',
        component: InfopagesDetailsComponent,
    }
  ];