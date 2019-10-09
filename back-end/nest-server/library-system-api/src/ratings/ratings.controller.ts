import { Controller, Param, Body, Post, Request, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDTO } from './models/CreateRatingDTO';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class RatingsController {
  public constructor(private readonly ratingsService: RatingsService) {}
  @Post('/books/:bookId/rating')
  @UseGuards(AuthGuard())
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
