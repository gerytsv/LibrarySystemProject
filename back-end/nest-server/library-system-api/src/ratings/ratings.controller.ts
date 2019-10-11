import { AuthGuardWithBlacklisting } from './../common/guards/blacklist.guard';
import {
  Controller,
  Param,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDTO } from './models/CreateRatingDTO';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class RatingsController {
  public constructor(private readonly ratingsService: RatingsService) {}

  @Get('/books/:bookId/rating')
  @UseGuards(AuthGuard())
  public async getBookRating(@Param('bookId') bookId: string) {
    return await this.ratingsService.getBookRating(bookId);
  }

  @Post('/books/:bookId/rating')
  @UseGuards(AuthGuard())
  public async createBookRating(
    @Request() request: any,
    @Param('bookId') bookId: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: CreateRatingDTO,
  ) {
    return await this.ratingsService.createRating(
      request.user.id,
      bookId,
      +body.vote,
    );
    // return { msg: 'Book Rated!' };
  }
}
