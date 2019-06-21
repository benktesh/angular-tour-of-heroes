import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Stock } from './stock';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stocks = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {stocks};
  }

  // Overrides the genId method to ensure that a stock always has an id.
  // If the stocks array is empty,
  // the method below returns the initial number (11).
  // if the stocks array is not empty, the method below returns the highest
  // stock id + 1.
  genId(stocks: Stock[]): number {
    return stocks.length > 0 ? Math.max(...stocks.map(stock => stock.id)) + 1 : 11;
  }
}