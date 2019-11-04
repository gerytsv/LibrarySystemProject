import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  BadRequestException,
  Put,
  Delete,
  UseInterceptors,
  UseGuards,
  Request,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from './models/create-review.dto';
import { ShowReviewDTO } from './models/show-review..dto';
import { TransformInterceptor } from '../transformer/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('api')
export class ReviewsController {
  public constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/books/:bookId/reviews')
  @UseInterceptors(new TransformInterceptor(ShowReviewDTO))
  @UseGuards(AuthGuard())
  public async readAllBookReviews(@Param('bookId') bookId: string) {
    return await this.reviewsService.getAllBookReviews(bookId);
  }

  @Get('/users/:userId/reviews')
  @UseInterceptors(new TransformInterceptor(ShowReviewDTO))
  @UseGuards(AuthGuard(), AdminGuard)
  public async readAllUserReviews(@Param('userId') userId: string) {
    return await this.reviewsService.getAllUserReviews(userId);
  }

  @Post('/books/:bookId/reviews')
  @UseInterceptors(new TransformInterceptor(ShowReviewDTO))
  @UseGuards(AuthGuard())
  public async createBookReview(
    @Request() request: any,
    @Param('bookId') bookId: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: CreateReviewDTO,
  ) {
    return await this.reviewsService.create(
      request.user.id,
      bookId,
      body.content,
    );
  }

  @Put('/books/reviews/:reviewId')
  @UseInterceptors(new TransformInterceptor(ShowReviewDTO))
  @UseGuards(AuthGuard())
  public async editBookReview(
    @Request() request: any,
    @Param('reviewId') reviewId: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: CreateReviewDTO,
  ) {
    return await this.reviewsService.editContent(
      request.user.id,
      reviewId,
      body.content,
    );
  }

    @Get('user/books/reviewed')
  @UseGuards(AuthGuard())
  public async getUserAllReviewedBooks(@Request() request: any) {
    return await this.reviewsService.getReviewedBooks(request.user.id);
  }

  @Delete('/books/reviews/:reviewId')
  @UseGuards(AuthGuard())
  public async deleteReview(
    @Request() request: any,
    @Param('reviewId') reviewId: string,
  ) {
    console.log(request.user.id);
    return await this.reviewsService.remove(request.user.id, reviewId);
  }
}
