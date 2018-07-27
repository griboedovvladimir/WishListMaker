import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLeftMenuComponent } from './main-left-menu.component';

describe('MainLeftMenuComponent', () => {
  let component: MainLeftMenuComponent;
  let fixture: ComponentFixture<MainLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
