import { Route } from "@angular/router";
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { AdminLinksListComponent } from "./links/admin-links-list/admin-links-list.component";
import { AdminLinksAddComponent } from "./links/admin-links-add/admin-links-add.component";
import { AdminLinksEditComponent } from "./links/admin-links-edit/admin-links-edit.component";
import { AdminLinkTypesListComponent } from "./links/admin-linktypes-list/admin-linktypes-list.component";
import { AdminLinkTypesAddComponent } from "./links/admin-linktypes-add/admin-linktypes-add.component";
import { AdminLinkTypesEditComponent } from "./links/admin-linktypes-edit/admin-linktypes-edit.component";

export default [
    {
      path: '',
      component: AdminMainComponent,
    },
    {
      path: '',
      component: AdminSidebarComponent,
      outlet: 'sidebar',
    },
    {
      path: 'links',
      component: AdminLinksListComponent,
    },
    {
      path: 'links/add',
      component: AdminLinksAddComponent,
    },
    {
      path: 'links/:id/edit',
      component: AdminLinksEditComponent,
    },
    {
      path: 'linktypes',
      component: AdminLinkTypesListComponent,
    },
    { 
      path: 'linktypes/add',
      component: AdminLinkTypesAddComponent,
    },
    { 
      path: 'linktypes/:id/edit',
      component: AdminLinkTypesEditComponent,
    },
  ] as Route[];