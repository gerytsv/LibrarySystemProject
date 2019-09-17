import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../database/entities/books.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Book])],
  providers: [BooksService],
  controllers: [BooksController],
  })
export class BooksModule {}
