import { Route } from "@angular/router";
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { MsalGuard } from "@azure/msal-angular";
import { AdminLinksListComponent } from "./links/admin-links-list/admin-links-list.component";
import { AdminLinksAddComponent } from "./links/admin-links-add/admin-links-add.component";
import { AdminLinksEditComponent } from "./links/admin-links-edit/admin-links-edit.component";

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
    {
      path: 'links/add',
      canActivate: [MsalGuard],
      component: AdminLinksAddComponent,
    },
    {
      path: 'links/edit/:id',
      canActivate: [MsalGuard],
      component: AdminLinksEditComponent,
    },
  ] as Route[];