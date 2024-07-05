import { Route } from "@angular/router";
import { LinksMainComponent } from "./components/links-main/links-main.component";
import { LinksSidebarComponent } from "./components/links-sidebar/links-sidebar.component";

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