import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Alpaca } from '../models/alpaca';
import { Infopage } from '../models/infopage';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor ( 
    private router: Router 
    ) { }

  public goToAlpacaDetailPage(alpaca: Alpaca): void {
    this.router.navigate(['/alpacas/detail', alpaca.id]);
  }

  public goToInfoDetailPage(infopage: Infopage): void {
    this.router.navigate(['/info/detail', infopage.id]);
  }
}
