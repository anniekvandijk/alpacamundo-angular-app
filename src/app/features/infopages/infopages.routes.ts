import { Route } from "@angular/router";
import { InfopagesListComponent } from "./components/infopages-list/infopages-list.component";
import { InfopagesSidebarComponent } from "./components/infopages-sidebar/infopages-sidebar.component";
import { InfopagesDetailsComponent } from "./components/infopages-list/infopages-details/infopages-details.component";

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