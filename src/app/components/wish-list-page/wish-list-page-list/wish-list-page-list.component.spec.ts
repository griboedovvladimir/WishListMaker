import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListPageListComponent } from './wish-list-page-list.component';

describe('WishListPageListComponent', () => {
  let component: WishListPageListComponent;
  let fixture: ComponentFixture<WishListPageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListPageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
