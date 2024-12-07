import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDetailsPage } from './input-details.page';

describe('InputDetailsPage', () => {
  let component: InputDetailsPage;
  let fixture: ComponentFixture<InputDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
