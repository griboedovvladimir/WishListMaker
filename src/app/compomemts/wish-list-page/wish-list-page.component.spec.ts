import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListPageComponent } from './wish-list-page.component';

describe('WishListPageComponent', () => {
  let component: WishListPageComponent;
  let fixture: ComponentFixture<WishListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
