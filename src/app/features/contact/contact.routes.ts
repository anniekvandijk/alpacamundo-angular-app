import { Route } from "@angular/router";
import { ContactMainComponent } from "./features/contact-main/contact-main.component";
import { ContactSidebarComponent } from "./features/contact-sidebar/contact-sidebar.component";

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