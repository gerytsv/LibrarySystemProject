import { Component, OnInit, Input } from '@angular/core';
import { reviews } from 'src/assets/review';
import { ReviewsDataService } from '../review-data.service';
import { NotificatorService } from '../../../core/services/notificator.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.css']
})
export class AllReviewsComponent implements OnInit {

  @Input() bookId: string;
  public haveReview = false;
  public user;

  constructor(private readonly reviewDataService: ReviewsDataService,
              private readonly notificator: NotificatorService,
              private readonly authService: AuthService) { }

  public reviews;

  ngOnInit() {
    this.authService.loggedUser$.subscribe(res => this.user = res);
    this.reviewDataService.getReviewsOfBook(this.bookId).subscribe( res => {
      this.reviews = res;
      res.forEach((review , index) => {
       if (review.user.username === this.user.username) {
         res.unshift(res.splice(index, 1)[0]);
         this.haveReview = true;
       }
      });
    });

  }

  public createReview(content) {
    this.reviewDataService.createReviewsOfBook(this.bookId, content).subscribe(res => {
      res.createdOn = new Date();
      this.reviews = [res , ...this.reviews];
      this.haveReview = true;
      this.notificator.success(`Review created`);
      }, errors => {
        this.notificator.error(`Invalid content`);
      });
  }

  public removeReview(reviewId: string) {
    this.reviews.shift();
    this.haveReview = false;
    this.notificator.success(`Review deleted`);
  }

}
