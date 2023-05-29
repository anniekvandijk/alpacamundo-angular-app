import { Route } from "@angular/router";
import { LinksMainComponent } from "./links-main/links-main.component";
import { LinksSidebarComponent } from "./links-sidebar/links-sidebar.component";

export default [
    {
        path: '',
        component: LinksMainComponent,
    },
    {
        path: '',
        component: LinksSidebarComponent,
        outlet: 'sidebar',
    },
  ] as Route[];