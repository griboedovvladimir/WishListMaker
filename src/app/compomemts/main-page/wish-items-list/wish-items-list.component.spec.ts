import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishItemsListComponent } from './wish-items-list.component';

describe('WishItemsListComponent', () => {
  let component: WishItemsListComponent;
  let fixture: ComponentFixture<WishItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
