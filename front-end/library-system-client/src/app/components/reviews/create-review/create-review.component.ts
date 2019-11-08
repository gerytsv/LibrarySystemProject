import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReviewsDataService } from '../review-data.service';
import { NotificatorService } from '../../../core/services/notificator.service';
import { ReviewDTO } from '../models/review.dto';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  public content = '';
  public bookId: string;
  @Output() public sendBody: EventEmitter<{content: string}> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() {
  }

  public onPostButtonClick() {
    this.sendBody.emit({content: this.content});
  }



}
