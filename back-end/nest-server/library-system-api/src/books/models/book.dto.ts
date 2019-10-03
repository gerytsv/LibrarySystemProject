import { Review } from '../../database/entities/reviews.entity';
import { Publish } from '../../transformer/decorators/publish';

export class BookDTO {
  public id: string;

  @Publish()
  public title: string;

  @Publish()
  public author: string;

  @Publish()
  public year: string;

  @Publish()
  public freeToBorrow: boolean;

  public isDeleted: boolean;

  public reviews: Review[];
}
