import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Rating } from '../database/entities/ratings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../database/entities/books.entity';
import { User } from '../database/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Book, User])],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
