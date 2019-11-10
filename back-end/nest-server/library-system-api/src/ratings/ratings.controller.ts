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
  UseInterceptors,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDTO } from './models/CreateRatingDTO';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../transformer/interceptors/transform.interceptor';
import { ShowRatingDTO } from './models/show-rating.dto';

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
  @UseInterceptors(new TransformInterceptor(ShowRatingDTO))
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
  }

  @Get('user/books/rated')
  @UseGuards(AuthGuard())
  public async getUserAllRatedBooks(@Request() request: any) {
    return await this.ratingsService.getUserRatedBooks(request.user.id);
  }
}
