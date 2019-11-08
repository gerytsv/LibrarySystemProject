import { Publish } from '../../transformer/decorators/publish';
import { IsString } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  public title: string;
  @IsString()
  public author: string;
  @IsString()
  public year: string;
  @IsString()
  public description: string;
}
