import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import LINKS from './../mocks/links.mock.json';
import ALPACAS from './../mocks/alpacas.mock.json';
import ALPACASHOWS from './../mocks/alpacashows.mock.json';
import FLEECES from './../mocks/fleeces.mock.json';
import INFOPAGES from './../mocks/infopages.mock.json';
import SHOWRESULTS from './../mocks/showresults.mock.json';

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
    //  links, 
    //  alpacas, 
    //  alpacashows, 
    //  fleeces, 
    //  infopages, 
    //  showresults
    };
  }
}