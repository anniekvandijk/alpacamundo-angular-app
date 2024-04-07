import { Route } from "@angular/router";
import { WarrantyMainComponent } from "./warranty-main/warranty-main.component";
import { AlpacasSidebarComponent } from "../alpacas/alpacas-sidebar/alpacas-sidebar.component";

export const WARRANTY_ROUTES: Route[] = [
    {
        path: '',
        component: WarrantyMainComponent,
      },
      {
        path: '',
        component: AlpacasSidebarComponent,
        outlet: 'sidebar',
      },
  ];