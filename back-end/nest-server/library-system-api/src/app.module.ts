import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PassportModule } from '@nestjs/passport';
import { RatingsModule } from './ratings/ratings.module';
import { LikesController } from './likes/likes.controller';
import { LikesService } from './likes/likes.service';
import { LikesModule } from './likes/likes.module';
import { FlagsModule } from './flags/flags.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    BooksModule,
    UsersModule,
    ReviewsModule,
    RatingsModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    LikesModule,
    FlagsModule,
  ],
  controllers: [AppController, LikesController],
  providers: [AppService, LikesService],
})
export class AppModule {}
