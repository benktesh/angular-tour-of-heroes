import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../stock';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StockService } from '../stock.service';


@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})



export class StockDetailComponent implements OnInit {

  @Input() stock: Stock;
  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private location: Location) { }

  ngOnInit() {
    this.getStock();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.stockService.updateStock(this.stock)
      .subscribe(() => this.goBack());
  }

  getStock(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stockService.getStock(id)
      .subscribe(stock => this.stock = stock);
  }

}
