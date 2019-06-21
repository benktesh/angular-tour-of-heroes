import { Injectable } from '@angular/core';
import { Stock } from './stock';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { promise } from 'protractor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class StockService {
  private stockUrl = 'api/stocks';  // URL to web api

  /** POST: add a new stock to the server */
  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.stockUrl, stock, httpOptions).pipe(
      tap((newStock: Stock) => this.log(`added stock w/ id=${newStock.id}`)),
      catchError(this.handleError<Stock>('addStock'))
    );
  }

  private log(message: string) {
    this.messageService.add(`StockService: ${message}`);
  }

  /** DELETE: delete the stock from the server */
  deleteStock(stock: Stock | number): Observable<Stock> {
    const id = typeof stock === 'number' ? stock : stock.id;
    const url = `${this.stockUrl}/${id}`;

    return this.http.delete<Stock>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted stock id=${id}`)),
      catchError(this.handleError<Stock>('deleteStock'))
    );
  }

  getStock(id: number): Observable<Stock> {

    const url = `${this.stockUrl}/${id}`;
    return this.http.get<Stock>(url).pipe(
      tap(_ => this.log(`fetched stock id=${id}`)),
      catchError(this.handleError<Stock>(`getStock id=${id}`))
    );
  }

  /*
  getAsync(ms: number) {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(HEROES);
      }, ms);
    });
    return promise;
  }
  */
  updateStock(stock: Stock): Observable<any> {
    return this.http.put(this.stockUrl, stock, httpOptions).pipe(
      tap(_ => this.log(`updated Stock id=${stock.id}`)),
      catchError(this.handleError<any>('updateStock'))
    );
  }

  data: Stock[] = [];

  getStocks(): Observable<Stock[]> {
    /*
    this.data = []; 
    this.messageService.add('HeroService: fetcing heroes');
    
    this.getAsync(1000).then(val => {
      var temp = val as Hero[];
      temp.forEach(element => {
        this.data.push(element as Hero);
      }); 

      //console.log(JSON.stringify(this.dataX));
      this.messageService.add('HeroService: fetched heroes');
    }
    );
    //return of(this.data);
    */

    // return of(HEROES);

    return this.http.get<Stock[]>(this.stockUrl)
      .pipe(
        tap(_ => this.log('fetched stocks')),
        catchError(this.handleError<Stock[]>('getStocks', []))
      );


  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  searchStocks(term: string): Observable<Stock[]> {
    if (!term.trim()) {
      // if not search term, return empty stock array.
      return of([]);
    }
    return this.http.get<Stock[]>(`${this.stockUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found stocks matching "${term}"`)),
      catchError(this.handleError<Stock[]>('searchStocks', []))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
