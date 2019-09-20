import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [DatabaseModule, BooksModule, UsersModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
