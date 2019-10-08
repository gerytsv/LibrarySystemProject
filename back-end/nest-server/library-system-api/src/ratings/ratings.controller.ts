import { Controller, Param, Body, Post, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDTO } from './models/CreateRatingDTO';

@Controller('api')
export class RatingsController {
  public constructor(private readonly ratingsService: RatingsService) {}
  @Post('/books/:bookId/rating')
  public async createBookRating(
    @Request() request: any,
    @Param('bookId') bookId: string,
    @Body() body: CreateRatingDTO,
  ) {
    console.log(request);
    return this.ratingsService.createRating(
      request.user.id,
      bookId,
      +body.vote,
    );
  }
}
