import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageExpensesPage } from './manage-expenses.page';

describe('ManageExpensesPage', () => {
  let component: ManageExpensesPage;
  let fixture: ComponentFixture<ManageExpensesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
