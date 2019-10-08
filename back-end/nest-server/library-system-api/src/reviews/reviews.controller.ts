import { Controller, Get, Param, Body, Post, BadRequestException, Put, Delete, UseInterceptors, UseGuards, Request, Patch } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from './models/create-review.dto';
import { ShowReviewDTO } from './models/show-review..dto';
import { UpdatedReviewDTO } from './models/updated-review.dto';
import { ResponseMessegeDTO } from './models/messege.dto';
import { UpdateReviewDTO } from './models/votes-review.dto';
import { TransformInterceptor } from '../transformer/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { actionsToMethods } from '../common/enums/update-actions';

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
    @UseGuards(AuthGuard())
    public async readAllUserReviews(@Param('userId') userId: string) {
        return await this.reviewsService.getAllUserReviews(userId);
    }

    @Post('/books/:bookId/reviews')
    @UseInterceptors(new TransformInterceptor(ShowReviewDTO))
    @UseGuards(AuthGuard())
    public async createBookReview(@Request() request: any, @Param('bookId') bookId: string , @Body() body: CreateReviewDTO) {
        return await this.reviewsService.create(request.user.id, bookId, body.content);
    }

    @Put('/books/reviews/:reviewId')
    @UseInterceptors(new TransformInterceptor(ShowReviewDTO))
    @UseGuards(AuthGuard())
    public async editBookReview(@Request() request: any, @Param('reviewId') reviewId: string , @Body() body: CreateReviewDTO) {
        return await this.reviewsService.editContent(request.user.id, reviewId, body.content);
    }

    @Delete('/books/reviews/:reviewId')
    @UseGuards(AuthGuard())
    public async deleteReview(@Request() request: any, @Param('reviewId') reviewId: string) {
        console.log(request.user.id);
        return await this.reviewsService.remove(request.user.id, reviewId);
    }

    // Body{ action: "like" / "flag" }
    @Patch('books/reviews/:reviewId/:int')
    @UseGuards(AuthGuard())
    public async updateReviewVotes(@Param('reviewId') reviewId: string, @Param('int') int: string, @Body() body: UpdateReviewDTO) {
        return await (this.reviewsService as any)[actionsToMethods[body.action]](reviewId, +int);
    }

}
