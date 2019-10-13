import { Book } from './../../database/entities/books.entity';
import { createConnection } from 'typeorm';
import { CreateBookDTO } from './../../books/models/create-book.dto';
import { BookDTO } from './../../books/models/book.dto';
import { BooksController } from './../../books/books.controller';
import { BooksService } from '../../books/books.service';
import { TestingModule, Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { SystemError } from '../../common/exceptions/system.error';
import { User } from '../../database/entities/users.entity';
describe('Books controller', () => {
  let controller: BooksController;
  let booksService: any;
  beforeEach(async () => {
    booksService = {
      allBooks() {
        /* Empty */
      },
      createBook() {
        /* Empty */
      },
      borrowBook() {
        /* Empty */
      },

      findBookById() {
        /* Empty */
      },
      delete() {
        /* Empty */
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: booksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('allBooks()', () => {
    it('should call booksService.allBooks', async () => {
      // Arrange
      const spy = jest.spyOn(booksService, 'allBooks');
      const fakeBook = new BookDTO();
      // Act
      await controller.allBooks(fakeBook.title, fakeBook.author);
      // Assert
      expect(booksService.allBooks).toHaveBeenCalledTimes(1);
    });
  });
  describe('bookById()', () => {
    it('should call booksService.findBookById with correcct bookId', async () => {
      // Arrange
      const fakeId: string = '1';
      const spy = jest.spyOn(booksService, 'findBookById');
      // Act
      await controller.bookById(fakeId);
      // Assert
      expect(booksService.findBookById).toHaveBeenCalledWith(fakeId);
      expect(booksService.findBookById).toHaveBeenCalledTimes(1);
    });
    it('should call booksService.findBookById and throw if the bookId isn\'t correct', async () => {
      // Arrange
      const fakeId: any = undefined;
      const spy = jest
        .spyOn(booksService, 'findBookById')
        .mockImplementation(() => Promise.resolve(fakeId));
      // Act && Assert
      expect(controller.bookById(fakeId)).rejects.toThrow(SystemError);
    });
  });
  //   describe('addNewBook()', () => {
  //     it('should invoke booksService.createBook with correct parameters', async () => {
  //       // Arrange
  //       const fakeUser = { id: '1', username: 'test', password: '123Ab' };
  //       const fakeBody = { title: 'test', author: 'Test', year: '2019' };
  //       const fakeBook = new Book();
  //       const spy = jest
  //         .spyOn(booksService, 'createBook')
  //         .mockReturnValue(fakeBook);
  //       // Act
  //       await controller.addNewBook(fakeUser, fakeBody);
  //       // Assert
  //       expect(booksService.createBook).toHaveBeenCalledWith(fakeUser, fakeBody);
  //     });
  //   });
});
