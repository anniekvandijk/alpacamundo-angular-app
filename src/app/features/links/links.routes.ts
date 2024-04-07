import { Route } from "@angular/router";
import { LinksMainComponent } from "./links-main/links-main.component";
import { LinksSidebarComponent } from "./links-sidebar/links-sidebar.component";

export const LINK_ROUTES: Route[] = [
    {
        path: '',
        component: LinksMainComponent,
    },
    {
        path: '',
        component: LinksSidebarComponent,
        outlet: 'sidebar',
    },
  ];