import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookPreviewComponent } from './single-book-preview.component';

describe('SingleBookPreviewComponent', () => {
  let component: SingleBookPreviewComponent;
  let fixture: ComponentFixture<SingleBookPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBookPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBookPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
