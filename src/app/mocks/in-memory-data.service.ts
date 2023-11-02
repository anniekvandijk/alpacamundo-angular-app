import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LINKS } from './links';
import { ALPACAS } from './alpacas';
import { ALPACASHOWS } from './alpacashows';
import { FLEECES } from './fleeces';
import { INFOPAGES } from './infopages';
import { SHOWRESULTS } from './showresults';

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