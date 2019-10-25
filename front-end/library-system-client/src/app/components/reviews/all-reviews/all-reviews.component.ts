import { Component, OnInit } from '@angular/core';
import { reviews } from 'src/assets/review';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.css']
})
export class AllReviewsComponent implements OnInit {

  constructor() { }

  public reviews;

  ngOnInit() {
    this.reviews = reviews;
  }

}
