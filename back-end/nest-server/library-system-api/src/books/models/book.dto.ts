import { Review } from '../../database/entities/reviews.entity';
import { Publish } from '../../transformer/decorators/publish';
import { User } from '../../database/entities/users.entity';

export class BookDTO {
  public id: string;

  @Publish()
  public title: string;

  @Publish()
  public author: string;

  @Publish()
  public year: string;

  @Publish()
  public description: string;

  @Publish()
  public freeToBorrow: boolean;

  public borrowedBy: Promise<User>;

  public isDeleted: boolean;
}
