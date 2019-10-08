import { UsernameDTO } from './../../users/models/username-user.dto';
import { Publish } from '../../transformer/decorators/publish';
import { User } from '../../database/entities/users.entity';
import { ShowUserDTO } from '../../users/models/show-user.dto';

export class ShowBookDTO {
  @Publish()
  public id: string;

  @Publish()
  public title: string;

  @Publish()
  public author: string;

  @Publish()
  public year: string;

  @Publish()
  public freeToBorrow: boolean;

  @Publish(UsernameDTO)
  public borrowedBy: Promise<User>;
}
