import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListListComponent } from './wish-list-list.component';

describe('WishListListComponent', () => {
  let component: WishListListComponent;
  let fixture: ComponentFixture<WishListListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
