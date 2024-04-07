import { Route } from "@angular/router";
import { ContactMainComponent } from "./contact-main/contact-main.component";
import { ContactSidebarComponent } from "./contact-sidebar/contact-sidebar.component";

export const CONTACT_ROUTES: Route[] = [
    {
        path: '',
        component: ContactMainComponent,
    },
    {
        path: '',
        component: ContactSidebarComponent,
        outlet: 'sidebar',
    },
  ];