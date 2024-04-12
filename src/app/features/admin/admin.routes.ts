import { Route } from "@angular/router";
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { AdminLinksListComponent } from "./links/features/admin-links-list/admin-links-list.component";
import { AdminLinksAddComponent } from "./links/features/admin-links-add/admin-links-add.component";
import { AdminLinksEditComponent } from "./links/features/admin-links-edit/admin-links-edit.component";
import { AdminLinkTypesListComponent } from "./linktypes/features/admin-linktypes-list/admin-linktypes-list.component";
import { AdminLinkTypesAddComponent } from "./linktypes/features/admin-linktypes-add/admin-linktypes-add.component";
import { AdminLinkTypesEditComponent } from "./linktypes/features/admin-linktypes-edit/admin-linktypes-edit.component";
import { TechnicalPageComponent } from "./admin-extras/error-page/technical-page.component";
import { AdminDocumentsListComponent } from "./documents/admin-documents-list/admin-documents-list.component";
import { NotFoundComponent } from "src/app/shared/features/not-found/not-found.component";

export const ADMIN_ROUTES: Route[] = [
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
      path: 'documents',
      component: AdminDocumentsListComponent,
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
    {
      path: 'technicalpage',
      component: TechnicalPageComponent,
    },
    {
      path: '**',
      children: [
        {
          path: '',
          component: NotFoundComponent,
        },
        {
          path: '',
          component: AdminSidebarComponent,
          outlet: 'sidebar',
        }
      ]
    }
  ];