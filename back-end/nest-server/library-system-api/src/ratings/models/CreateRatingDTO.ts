import { IsNumber } from 'class-validator';

export class CreateRatingDTO {
  @IsNumber()
  public vote: number;
}
