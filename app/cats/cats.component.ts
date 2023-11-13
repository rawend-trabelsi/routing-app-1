import { Component, OnInit } from '@angular/core';
import { Cat } from '../cat';
import { CatsService } from '../cats.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {
  cats: Cat[] = [];

  constructor(private catsService: CatsService) { }

  ngOnInit() {
    this.catsService.getCats().subscribe(cats => this.cats = cats);
  }

  showCatDetails(catId: number) {
   
    this.catsService.updateSelectedCatDetails(catId);
  }
}
