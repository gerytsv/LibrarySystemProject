import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ReviewsDataService } from './review-data.service';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [ReviewComponent, AllReviewsComponent, CreateReviewComponent],
  imports: [
    CommonModule, FormsModule
  ],
  providers: [ReviewsDataService],
  exports: [ReviewComponent, AllReviewsComponent, CreateReviewComponent]
})
export class ReviewModule { }
