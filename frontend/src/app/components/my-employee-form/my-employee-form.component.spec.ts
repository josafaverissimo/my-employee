import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEmployeeFormComponent } from './my-employee-form.component';

describe('MyEmployeeFormComponent', () => {
  let component: MyEmployeeFormComponent;
  let fixture: ComponentFixture<MyEmployeeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEmployeeFormComponent]
    });
    fixture = TestBed.createComponent(MyEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
