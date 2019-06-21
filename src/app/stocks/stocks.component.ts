import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})


export class StocksComponent implements OnInit {

  stocks: Stock[];

  constructor(private stockService: StockService) {
  }

  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.stocks = stocks);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.stockService.addStock({ name } as Stock)
      .subscribe(stock => {
        this.stocks.push(stock);
      });
  }

  delete(stock: Stock): void {
    this.stocks = this.stocks.filter(h => h !== stock);
    this.stockService.deleteStock(stock).subscribe();
  }

  ngOnInit() {
    this.getStocks();
  }

}
