import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWishesComponent } from './add-wishes.component';

describe('AddWishesComponent', () => {
  let component: AddWishesComponent;
  let fixture: ComponentFixture<AddWishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
