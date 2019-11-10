import { BooksDataService } from './books-data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
describe('BooksService', () => {
  let httpClient;

  let service: BooksDataService;

  beforeEach(async(() => {
    jest.clearAllMocks();

    httpClient = {
      get() {},
      post() {},
      put() {},
      delete() {}
    };

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BooksDataService]
    }).overrideProvider(HttpClient, { useValue: httpClient });

    service = TestBed.get(BooksDataService);
  }));

  it('should be defined', () => {
    // Arrange & Act & Assert
    expect(service).toBeDefined();
  });

  describe('allBooks()', () => {
    it('should call the httpClient.get() method once', (done) => {
      // Arrange
      const url = 'http://localhost:3000/api/books';
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act & Assert
      service.allBooks().subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url);

        done();
      });
    });

    it('should return the result from the httpClient.get() method', () => {
      // Arrange
      const url = 'http://localhost:3000/api/books';
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act
      const result = service.allBooks();

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('borrowBook()', () => {
    it('should call the httpClient.put() method once with correct parameters', (done) => {
      // Arrange
      const id = '1';
      const url = `http://localhost:3000/api/books/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'put').mockReturnValue(returnValue);

      // Act & Assert
      service.borrowBook(id).subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url, {});

        done();
      });
    });

    it('should return the result from the httpClient.put() method', () => {
      // Arrange
      const id = '1';
      const url = `http://localhost:3000/api/books/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'put').mockReturnValue(returnValue);

      // Act
      const result = service.borrowBook(id);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('searchBooks()', () => {
    it('should call the httpClient.get() method once with correct parameters', (done) => {
      // Arrange
      const query = 'title';
      const value = 'Margaret';
      const url = `http://localhost:3000/api/books?${query}=${value}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act & Assert
      service.searchBooks(query, value).subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url);

        done();
      });
    });

    it('should return the result from the httpClient.get() method', () => {
      // Arrange
      const query = 'title';
      const value = 'Margaret';
      const url = `http://localhost:3000/api/books?${query}=${value}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act
      const result = service.searchBooks(query, value);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('ratedBooks()', () => {
    it('should call the httpClient.get() method once', (done) => {
      // Arrange
      const url = `http://localhost:3000/api/user/books/rated`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act & Assert
      service.ratedBooks().subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url);

        done();
      });
    });

    it('should return the result from the httpClient.get() method', () => {
      // Arrange
      const url = `http://localhost:3000/api/user/books/rated`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act
      const result = service.ratedBooks();

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('reviewedBooks()', () => {
    it('should call the httpClient.get() method once', (done) => {
      // Arrange
      const url = `http://localhost:3000/api/user/books/reviewed`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act & Assert
      service.reviewedBooks().subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url);

        done();
      });
    });

    it('should return the result from the httpClient.get() method', () => {
      // Arrange
      const url = `http://localhost:3000/api/user/books/reviewed`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act
      const result = service.reviewedBooks();

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('viewCurrentBook()', () => {
    it('should call the httpClient.get() method once', (done) => {
      // Arrange
      const id = '1';
      const url = `http://localhost:3000/api/books/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act & Assert
      service.viewCurrentBook(id).subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url);

        done();
      });
    });

    it('should return the result from the httpClient.get() method', () => {
      // Arrange
      const id = '1';
      const url = `http://localhost:3000/api/books/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act
      const result = service.viewCurrentBook(id);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });
});
