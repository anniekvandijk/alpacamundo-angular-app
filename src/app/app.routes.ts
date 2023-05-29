import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/other/not-found/not-found.component';
import { HomeSidebarComponent } from './pages/home/home-sidebar/home-sidebar.component';

export const ROUTES: Routes = [
    {
      path: '',
      loadChildren: () => import('./pages/home/home.routes')
    },
    { 
      path: 'about',
      loadChildren: () => import('./pages/about/about.routes')
    },
    { 
      path: 'students',
      loadChildren: () => import('./pages/students/students.routes')
    },
    { 
      path: 'alpacas',
      loadChildren: () => import('./pages/alpacas/alpacas.routes')
    }, 
    { 
      path: 'warranty',
      loadChildren: () => import('./pages/warranty/warranty.routes')
    }, 
    { 
      path: 'info',
      loadChildren: () => import('./pages/infopages/infopages.routes')
    },
    { 
      path: 'contact',
      loadChildren: () => import('./pages/contact/contact.routes')
    },
    { 
      path: 'links',
      loadChildren: () => import('./pages/links/links.routes')
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