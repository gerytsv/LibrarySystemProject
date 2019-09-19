import { Review } from '../../database/entities/reviews.entity';

export class BookDTO {
  public id: string;

  public title: string;

  public author: string;

  public year: string;

  public freeToBorrow: boolean;

  public isDeleted: boolean;

  public reviews: Review[];
}
