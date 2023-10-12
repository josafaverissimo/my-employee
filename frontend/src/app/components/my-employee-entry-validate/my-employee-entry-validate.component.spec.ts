import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEmployeeEntryValidateComponent } from './my-employee-entry-validate.component';

describe('MyEmployeeEntryValidateComponent', () => {
  let component: MyEmployeeEntryValidateComponent;
  let fixture: ComponentFixture<MyEmployeeEntryValidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEmployeeEntryValidateComponent]
    });
    fixture = TestBed.createComponent(MyEmployeeEntryValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
