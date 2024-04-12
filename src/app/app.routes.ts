import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/features/not-found/not-found.component';
import { HomeSidebarComponent } from './features/home/features/home-sidebar/home-sidebar.component';
import { MsalGuard } from '@azure/msal-angular';

export const ROUTES: Routes = [
    {
      path: '',
      loadChildren: () => import('./features/home/home.routes')
        .then(m => m.HOME_ROUTES)
    },
    {
      path: 'admin',
      loadChildren: () => import('./features/admin/admin.routes')
        .then(m => m.ADMIN_ROUTES),
      canActivate: [MsalGuard],
      canActivateChild: [MsalGuard], // TODO: it seems that this is not needed?
    },
    { 
      path: 'about',
      loadChildren: () => import('./features/about/about.routes')
        .then(m => m.ABOUT_ROUTES)
    },
    { 
      path: 'students',
      loadChildren: () => import('./features/students/students.routes')
        .then(m => m.STUDENTS_ROUTES)
    },
    { 
      path: 'alpacas',
      loadChildren: () => import('./features/alpacas/alpacas.routes')
        .then(m => m.ALPACA_ROUTES)
    }, 
    { 
      path: 'warranty',
      loadChildren: () => import('./features/warranty/warranty.routes')
        .then(m => m.WARRANTY_ROUTES)
    }, 
    { 
      path: 'info',
      loadChildren: () => import('./features/infopages/infopages.routes')
        .then(m => m.INFOPAGE_ROUTES)
    },
    { 
      path: 'contact',
      loadChildren: () => import('./features/contact/contact.routes')
        .then(m => m.CONTACT_ROUTES)
    },
    { 
      path: 'links',
      loadChildren: () => import('./features/links/links.routes')
        .then(m => m.LINK_ROUTES)
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
          component: HomeSidebarComponent,
          outlet: 'sidebar',
        }
      ]
    }
];