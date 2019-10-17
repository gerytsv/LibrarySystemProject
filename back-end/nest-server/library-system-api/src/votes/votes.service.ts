import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/users.entity';
import { Review } from '../database/entities/reviews.entity';
import { Vote } from '../database/entities/votes.entity';
import { SystemError } from '../common/exceptions/system.error';

@Injectable()
export class VotesService {
  public constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Vote) private readonly votesRepository: Repository<Vote>,
  ) {}

  public async like(userId: string, reviewId: string) {
    const review: Review = await this.reviewsRepository.findOne({
      where: { id: reviewId, isDeleted: false },
    });
    if (!review) {
      throw new SystemError('No such review', 400);
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId, isDeleted: false },
    });
    if (!user) {
      throw new SystemError('User not found', 400);
    }

    const votedAlready: Vote = await this.votesRepository.findOne({
      where: { user, review },
    });

    if (votedAlready && votedAlready.liked === true) {
      votedAlready.liked = false;
      await this.votesRepository.save(votedAlready);
      return { messege: 'Review unliked' };
    } else if (
      votedAlready &&
      votedAlready.liked === false &&
      votedAlready.flagged === false
    ) {
      votedAlready.liked = true;
      await this.votesRepository.save(votedAlready);
      return { messege: 'Review liked' };
    } else if (
      votedAlready &&
      votedAlready.liked === false &&
      votedAlready.flagged === true
    ) {
      votedAlready.liked = true;
      votedAlready.flagged = false;
      await this.votesRepository.save(votedAlready);
      return { messege: 'Review liked' };
    }

    const liked = this.votesRepository.create();
    liked.user = Promise.resolve(user);
    liked.review = Promise.resolve(review);
    liked.liked = true;

    await this.votesRepository.save(liked);

    return { messege: 'Review liked' };
  }

  public async flag(userId: string, reviewId: string) {
    const review: Review = await this.reviewsRepository.findOne({
      where: { id: reviewId, isDeleted: false },
    });
    if (!review) {
      throw new SystemError('No such review', 400);
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId, isDeleted: false },
    });
    if (!user) {
      throw new SystemError('User not found', 400);
    }

    const votedAlready: Vote = await this.votesRepository.findOne({
      where: { user, review },
    });

    if (votedAlready && votedAlready.flagged === true) {
      votedAlready.flagged = false;
      await this.votesRepository.save(votedAlready);
      return { messege: 'Review unflagged' };
    } else if (
      votedAlready &&
      votedAlready.flagged === false &&
      votedAlready.liked === false
    ) {
      votedAlready.flagged = true;
      await this.votesRepository.save(votedAlready);
      return { messege: 'Review flagged' };
    } else if (
      votedAlready &&
      votedAlready.flagged === false &&
      votedAlready.liked === true
    ) {
      votedAlready.flagged = true;
      votedAlready.liked = false;
      await this.votesRepository.save(votedAlready);
      return { messege: 'Review flagged' };
    }

    const flagged = this.votesRepository.create();
    flagged.user = Promise.resolve(user);
    flagged.review = Promise.resolve(review);
    flagged.flagged = true;

    await this.votesRepository.save(flagged);

    return { messege: 'Review unflagged' };
  }

  public async getVotes(reviewId: string) {
    const review: Review = await this.reviewsRepository.findOne({
      where: { id: reviewId, isDeleted: false },
    });
    const votes: Vote[] = await this.votesRepository.find({
      where: { review },
    });
    if (!review) {
      throw new SystemError('No such review', 400);
    }
    const votesToReturn = votes.reduce(
      (acc, vote) => {
        if (vote.liked === true) {
          acc.likes++;
        }
        if (vote.flagged === true) {
          acc.flags++;
        }
        return acc;
      },
      { likes: 0, flags: 0 },
    );
    return votesToReturn;
  }

  public async getAllUsersVoted(reviewId: string) {
    const review = await this.reviewsRepository.findOne({
      where: { id: reviewId, isDeleted: false },
    });
    const votes: Vote[] = await review.votes;

    const users = votes.reduce(
      (acc, vote) => {
        if (vote.liked) {
          acc.liked.push(vote.user);
        }
        if (vote.flagged) {
          acc.flagged.push(vote.user);
        }
        return acc;
      },
      { liked: [], flagged: [] },
    );
    const usersLiked = await Promise.all(users.liked);
    const usersLikedIds = usersLiked.reduce((acc, user) => {
      acc.push(user.id);
      return acc;
    }, []);
    const usersFlagged = await Promise.all(users.flagged);
    const usersFlaggedIds = usersFlagged.reduce((acc, user) => {
      acc.push(user.id);
      return acc;
    }, []);
    return { usersLikedIds, usersFlaggedIds };
  }
}
