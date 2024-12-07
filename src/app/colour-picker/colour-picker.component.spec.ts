import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColourPickerComponent } from './colour-picker.component';

describe('ColourPickerComponent', () => {
  let component: ColourPickerComponent;
  let fixture: ComponentFixture<ColourPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ColourPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColourPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
