import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageBookComponent } from './main-page-book.component';

describe('MainPageBookComponent', () => {
  let component: MainPageBookComponent;
  let fixture: ComponentFixture<MainPageBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
