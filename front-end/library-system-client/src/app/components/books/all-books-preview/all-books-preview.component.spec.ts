import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBooksPreviewComponent } from './all-books-preview.component';

describe('AllBooksPreviewComponent', () => {
  let component: AllBooksPreviewComponent;
  let fixture: ComponentFixture<AllBooksPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBooksPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBooksPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
