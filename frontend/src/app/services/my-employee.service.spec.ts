import { TestBed } from '@angular/core/testing';

import { MyEmployeeService } from './my-employee.service';

describe('MyEmployeeService', () => {
  let service: MyEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
