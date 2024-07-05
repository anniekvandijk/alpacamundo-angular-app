import { Route } from "@angular/router";
import { AlpacaCardListComponent } from "./components/alpaca-list/alpaca-card-list.component";
import { AlpacasSidebarComponent } from "./components/alpacas-sidebar/alpacas-sidebar.component";
import { AlpacaDetailsComponent } from "./components/alpaca-details/alpaca-details.component";

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