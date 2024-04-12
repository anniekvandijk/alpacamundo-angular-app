import { Route } from "@angular/router";
import { InfopagesListComponent } from "./features/infopages-list/infopages-list.component";
import { InfopagesSidebarComponent } from "./features/infopages-sidebar/infopages-sidebar.component";
import { InfopagesDetailsComponent } from "./features/infopages-list/infopages-details/infopages-details.component";

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