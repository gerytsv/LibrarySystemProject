import { Publish } from '../../transformer/decorators/publish';

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
}
