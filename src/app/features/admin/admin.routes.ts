import { Route } from "@angular/router";
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { AdminLinksListComponent } from "./links/admin-links-list/admin-links-list.component";
import { AdminLinksEditComponent } from "./links/admin-links-edit/admin-links-edit.component";
import { AdminLinkTypesListComponent } from "./linktypes/admin-linktypes-list/admin-linktypes-list.component";
import { AdminLinkTypesEditComponent } from "./linktypes/admin-linktypes-edit/admin-linktypes-edit.component";
import { TechnicalPageComponent } from "./admin-extras/technical-page/technical-page.component";
import { AdminDocumentsListComponent } from "./documents/admin-documents-list/admin-documents-list.component";
import { NotFoundComponent } from "src/app/shared/components/not-found/not-found.component";
import { AdminAlpacasListComponent } from "./alpacas/admin-alpacas-list/admin-alpacas-list.component";
import { AdminAlpacasEditComponent } from "./alpacas/admin-alpacas-edit/admin-alpacas-edit.component";

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
      component: AdminLinksEditComponent,
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
      component: AdminLinkTypesEditComponent,
    },
    { 
      path: 'linktypes/:id/edit',
      component: AdminLinkTypesEditComponent,
    },
    {
      path: 'alpacas',
      component: AdminAlpacasListComponent,
    },
    { 
      path: 'alpacas/add',
      component: AdminAlpacasEditComponent,
    },
    { 
      path: 'alpacas/:id/edit',
      component: AdminAlpacasEditComponent,
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