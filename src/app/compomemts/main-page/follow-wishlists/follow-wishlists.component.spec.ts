import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowWishlistsComponent } from './follow-wishlists.component';

describe('FollowWishlistsComponent', () => {
  let component: FollowWishlistsComponent;
  let fixture: ComponentFixture<FollowWishlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowWishlistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowWishlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
