import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEmployeeEntriesListComponent } from './my-employee-entries-list.component';

describe('MyEmployeeEntriesListComponent', () => {
  let component: MyEmployeeEntriesListComponent;
  let fixture: ComponentFixture<MyEmployeeEntriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEmployeeEntriesListComponent]
    });
    fixture = TestBed.createComponent(MyEmployeeEntriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
