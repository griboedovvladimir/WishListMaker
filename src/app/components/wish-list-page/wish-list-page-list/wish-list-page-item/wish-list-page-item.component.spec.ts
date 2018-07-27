import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListPageItemComponent } from './wish-list-page-item.component';

describe('WishListPageItemComponent', () => {
  let component: WishListPageItemComponent;
  let fixture: ComponentFixture<WishListPageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListPageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
