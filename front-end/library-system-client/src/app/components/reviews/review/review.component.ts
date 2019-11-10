import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ReviewsDataService } from '../review-data.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private readonly authService: AuthService,
              private readonly reviewsDataService: ReviewsDataService ) { }

  @Input() public review;
  @Output() public deleteReviewId: EventEmitter<string> = new EventEmitter();
  public updatedReview;
  public ReviewOwner: string;
  public isReviewOwner = false;
  public show = false;
  public votes = {likes: 0 , flags: 0};
  public myvotes = {liked: false, flagged: false};

  ngOnInit() {
    this.updatedReview = this.review.content;
    this.authService.loggedUser$.subscribe(res => {
    this.ReviewOwner = res.username;
    this.review.user.username === this.ReviewOwner ? this.isReviewOwner = true : this.isReviewOwner = false ;
    });
    this.reviewsDataService.getVotesOfReview(this.review.id).subscribe(res => {
      this.votes = res.votes;
      this.myvotes = res.myVotes;
    });
  }

  public toggleEditButton() {
    this.show = !this.show;
  }

  public updateReview() {
    this.review.content = this.updatedReview;
    this.reviewsDataService.updateReviewContent(this.review.id, {content: this.updatedReview});
  }

  public deleteReview() {
    this.deleteReviewId.emit(this.review.id);
    this.reviewsDataService.deleteReview(this.review.id).subscribe();
  }

  public likeReview() {
    this.reviewsDataService.likeReview(this.review.id).subscribe(res => {
    this.reviewsDataService.getVotesOfReview(this.review.id).subscribe(res => {
      this.votes = res.votes;
      this.myvotes = res.myVotes;
      });
    });
  }

  public flagReview() {
    this.reviewsDataService.flagReview(this.review.id).subscribe(res => {
      this.reviewsDataService.getVotesOfReview(this.review.id).subscribe(res => {
        this.votes = res.votes;
        this.myvotes = res.myVotes;
        });
    });
  }

}
