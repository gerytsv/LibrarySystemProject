import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NotificatorService } from '../../../core/services/notificator.service';
import { CreateReviewComponent } from '../create-review/create-review.component';
import { ReviewsDataService } from '../review-data.service';
import { ReviewComponent } from '../review/review.component';
import { AllReviewsComponent } from './all-reviews.component';
import { AuthService } from '../../../core/services/auth.service';
import { CoreModule } from '../../../core/core.module';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

describe('AllReviewsComponent', () => {
    let reviewsService;
    let notificationService;
    let authService;
    const mockedUser = {
      username: 'Kitko',
      email: 'Jijo'
    };

    let fixture: ComponentFixture<AllReviewsComponent>;
    let component: AllReviewsComponent;

    beforeEach(async(() => {
      jest.clearAllMocks();

      reviewsService = {
        getAllTodos() {},
        createTodo() {},
        updateTodo() {},
        deleteTodo() {}
      };

      authService = {
        loggedUser$() {
          return of(mockedUser);
        }
      };

      notificationService = {
        error() {}
      };

      TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule, CoreModule],
        declarations: [ReviewComponent, AllReviewsComponent, CreateReviewComponent],
        providers: [ReviewsDataService, NotificatorService, AuthService]
      })
        .overrideProvider(ReviewsDataService, { useValue: reviewsService })
        .overrideProvider(NotificatorService, { useValue: notificationService })
        .overrideProvider(AuthService, { useValue: authService })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AllReviewsComponent);
          component = fixture.componentInstance;
        });
    }));


    it('should be defined', () => {
        // Arrange & Act & Assert
        expect(component).toBeDefined();
      });

    it('onInit() should' , () => {
      // Arrange
      const spy = jest
      .spyOn(authService, 'loggedUser$')
      .mockImplementation(() => of(mockedUser));
      // Act
      component.ngOnInit();
      // Assert
      expect(component).toBeDefined();
    });
});
