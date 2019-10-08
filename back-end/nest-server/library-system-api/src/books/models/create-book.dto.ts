import { Publish } from '../../transformer/decorators/publish';

export class CreateBookDTO {
    @Publish()
    public title: string;
    @Publish()
    public author: string;
    @Publish()
    public year: string;
  }
