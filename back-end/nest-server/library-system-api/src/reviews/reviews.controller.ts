import { Controller, Get, Param, Body, Post, BadRequestException, Put, Delete, } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from '../database/entities/reviews.entity';
import { Params } from 'express-serve-static-core';
import { CreateReviewDTO } from './models/create-review.dto';
import { ShowReviewDTO } from './models/show-review..dto';
import { UpdatedReviewDTO } from './models/updated-review.dto';
import { ResponseMessegeDTO } from './models/messege.dto';

@Controller('api')
export class ReviewsController {

    public constructor(private readonly reviewsService: ReviewsService) {}

    @Get('/books/:bookId/reviews')
    public async readAllBookReviews(@Param('bookId') bookId: string): Promise<ShowReviewDTO[]> {
        return await this.reviewsService.getAllBookReviews(bookId);
    }

    @Get('/users/:userId/reviews')
    public async readAllUserReviews(@Param('userId') userId: string): Promise<ShowReviewDTO[]> {
        return await this.reviewsService.getAllUserReviews(userId);
    }

    @Post('/users/:userId/books/:bookId/reviews')
    public async createBookReview(@Param('userId') userId: string, @Param('bookId') bookId: string , @Body()body: CreateReviewDTO): Promise<ShowReviewDTO|BadRequestException> {
        return await this.reviewsService.createReview(userId, bookId, body.content);
    }

    @Put('/users/:userId/reviews/:reviewId')
    public async editReview(@Param('userId') userID: string, @Param('reviewId') reviewId: string, @Body() body: UpdatedReviewDTO): Promise<ResponseMessegeDTO|BadRequestException> {
        return await this.reviewsService.editReviewContent(userID, reviewId, body.content);
    }

    @Delete('/users/:userId/reviews/:reviewId')
    public async deleteReview(@Param('userId') userID: string, @Param('reviewId') reviewId: string): Promise<ResponseMessegeDTO|BadRequestException> {
        return await this.reviewsService.removeReview(userID, reviewId);
    }

}
