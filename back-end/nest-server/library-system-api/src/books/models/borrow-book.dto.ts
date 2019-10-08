import { CreateUserDTO } from './../../users/models/create-user.dto';
import { User } from '../../database/entities/users.entity';
import { Publish } from '../../transformer/decorators/publish';
import { UsernameDTO } from '../../users/models/username-user.dto';

export class BorrowBookDTO {
  @Publish()
  public freeToBorrow: boolean;
  @Publish()
  public borrowedBy: Promise<User>;
}
