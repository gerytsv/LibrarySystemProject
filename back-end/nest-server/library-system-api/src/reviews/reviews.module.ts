import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from '../database/entities/reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../database/entities/books.entity';
import { User } from '../database/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Book, User])],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
