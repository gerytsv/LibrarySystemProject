import {
  Controller,
  Put,
  Patch,
  UseGuards,
  Param,
  Body,
  Request,
  Post,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateReviewDTO } from '../reviews/models/votes-review.dto';
import { actionsToMethods } from '../common/enums/update-actions';
import { VotesService } from './votes.service';

@Controller('api')
export class VotesController {
  public constructor(private readonly votesService: VotesService) {}

  @Post('books/reviews/:reviewId/votes')
  @UseGuards(AuthGuard())
  public async votes(
    @Param('reviewId') reviewId: string,
    @Body() body: UpdateReviewDTO,
    @Request() request: any,
  ) {

    return await (this.votesService as any)[body.action](
      request.user.id,
      reviewId,
    );
  }

  @Get('books/reviews/:reviewId/votes')
  @UseGuards(AuthGuard())
  public async getAllVotes(
    @Param('reviewId') reviewId: string,
    @Body() body: UpdateReviewDTO,
    @Request() request: any
  ) {

    return {
      votes: await this.votesService.getVotes(reviewId),
      myVotes: await this.votesService.myVotes(reviewId, request.user.id)
    };

  }

  @Get('books/reviews/:reviewId/votes/users')
  @UseGuards(AuthGuard())
  public async getAllLikedUsers(
    @Param('reviewId') reviewId: string,
    @Body() body: UpdateReviewDTO,
    @Request() request: any,
  ) {

    return await this.votesService.getAllUsersVoted(reviewId);
  }

}
