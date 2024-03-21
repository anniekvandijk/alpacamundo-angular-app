import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/features/not-found/not-found.component';
import { HomeSidebarComponent } from './features/home/home-sidebar/home-sidebar.component';
import { MsalGuard } from '@azure/msal-angular';

export const ROUTES: Routes = [
    {
      path: '',
      loadChildren: () => import('./features/home/home.routes')
    },
    {
      path: 'admin',
      loadChildren: () => import('./features/admin/admin.routes'),
      canActivate: [MsalGuard]
    },
    { 
      path: 'about',
      loadChildren: () => import('./features/about/about.routes')
    },
    { 
      path: 'students',
      loadChildren: () => import('./features/students/students.routes')
    },
    { 
      path: 'alpacas',
      loadChildren: () => import('./features/alpacas/alpacas.routes')
    }, 
    { 
      path: 'warranty',
      loadChildren: () => import('./features/warranty/warranty.routes')
    }, 
    { 
      path: 'info',
      loadChildren: () => import('./features/infopages/infopages.routes')
    },
    { 
      path: 'contact',
      loadChildren: () => import('./features/contact/contact.routes')
    },
    { 
      path: 'links',
      loadChildren: () => import('./features/links/links.routes')
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