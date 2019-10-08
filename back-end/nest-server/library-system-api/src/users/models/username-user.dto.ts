import { Publish } from '../../transformer/decorators/publish';

export class UsernameDTO {
  @Publish()
  public username: string;
}
