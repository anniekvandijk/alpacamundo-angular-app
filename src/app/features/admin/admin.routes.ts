import { Route } from "@angular/router";
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { MsalGuard } from "@azure/msal-angular";
import { AdminLinksListComponent } from "./links/links-list/admin-links-list.component";

export default [
    {
      path: '',
      canActivate: [MsalGuard],
      component: AdminMainComponent,
    },
    {
      path: '',
      canActivate: [MsalGuard],
      component: AdminSidebarComponent,
      outlet: 'sidebar',
    },
    {
      path: 'links',
      canActivate: [MsalGuard],
      component: AdminLinksListComponent,
    },
  ] as Route[];