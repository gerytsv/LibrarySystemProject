import { SearchService } from './../../../core/services/search.service';
import { BooksDataService } from './../books-data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AllBooksPreviewComponent } from './all-books-preview.component';
import { SharedModule } from '../../../shared/shared.module';

describe('AllBooksPreviewComponent', () => {
  let booksService;
  let searchInfo;
  let route;

  let fixture: ComponentFixture<AllBooksPreviewComponent>;
  let component: AllBooksPreviewComponent;

  beforeEach(async(() => {
    jest.clearAllMocks();

    booksService = {
      allBooks() {},
      getBorrowedBooks() {},
      borrowBook() {},
      searchBooks() {},
      ratedBooks() {},
      reviewedBooks() {},
      viewCurrentBook() {},
    };

    searchInfo = {
      SearchInfo$() {},
      collectSearchInfo() {},
      getInfo() {}
    };

    route = {
      snapshot() {},
      url() {},
      data() {}
    }

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AllBooksPreviewComponent,],
      providers: [BooksDataService, SearchService]
    })
      .overrideProvider(BooksDataService, { useValue: BooksDataService })
      .overrideProvider(SearchService, { useValue: SearchService })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AllBooksPreviewComponent);
        component = fixture.componentInstance;
      });
  }));

  // it('should be defined', () => {
  //   // Arrange & Act & Assert
  //   expect(component).toBeDefined();
  // });
}
