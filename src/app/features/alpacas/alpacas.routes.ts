import { Route } from "@angular/router";
import { AlpacaCardListComponent } from "./alpaca-card-list/alpaca-card-list.component";
import { AlpacasSidebarComponent } from "./alpacas-sidebar/alpacas-sidebar.component";
import { AlpacaDetailsComponent } from "./alpaca-details/alpaca-details.component";

export const ALPACA_ROUTES: Route[] = [
    {
        path: ':filter',
        component: AlpacaCardListComponent
    },
    {
        path: '',
        component: AlpacaCardListComponent
    },
    {
        path: '',
        component: AlpacasSidebarComponent,
        outlet: 'sidebar',
    },
    { 
        path: 'detail/:id',
        component: AlpacaDetailsComponent 
    }, 
  ];