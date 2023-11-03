import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LINKS } from '../../features/links/links.mock';
import { ALPACAS } from '../../features/alpacas/alpacas.mock';
import { ALPACASHOWS } from '../../features/alpacas/alpacashows.mock';
import { FLEECES } from '../../features/alpacas/fleeces.mock';
import { INFOPAGES } from '../../features/infopages/infopages.mock';
import { SHOWRESULTS } from '../../features/alpacas/showresults.mock';

@Injectable({
  providedIn: 'root',
})


export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const links = LINKS;
    const alpacas = ALPACAS;
    const alpacashows = ALPACASHOWS;
    const fleeces = FLEECES;
    const infopages = INFOPAGES;
    const showresults = SHOWRESULTS;
    return {
      links, 
      alpacas, 
      alpacashows, 
      fleeces, 
      infopages, 
      showresults
    };
  }
}