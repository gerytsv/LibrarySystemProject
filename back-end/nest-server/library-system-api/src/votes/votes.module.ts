import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/users.entity';
import { AuthModule } from '../auth/auth.module';
import { Review } from '../database/entities/reviews.entity';
import { Vote } from '../database/entities/votes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Vote]), AuthModule],
  providers: [VotesService],
  controllers: [VotesController]
})
export class VotesModule {}
