import { Component } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { MyEmployeeService } from "../../services/my-employee.service";
import {EmployeeEntry} from "../../../interfaces/EmployeeEntry";

@Component({
  selector: 'app-my-employee-entry-validate',
  templateUrl: './my-employee-entry-validate.component.html',
  styleUrls: ['./my-employee-entry-validate.component.css']
})
export class MyEmployeeEntryValidateComponent {
  employeeEntryTableColumns: string[] = []
  employeeEntryTableRow: string[][] = []

  constructor(
    private myEmployeeService: MyEmployeeService,
    private route: ActivatedRoute
  ) {
    this.employeeEntryTableColumns = this.myEmployeeService.getTableColumns()

    this.setEmployeeEntryTableRow()
  }

  private setEmployeeEntryTableRow(): void {
    // @ts-ignore
    const employeeName: string = this.route.snapshot.paramMap.get('employeeName')

    this.myEmployeeService.getByEmployeeName(employeeName).subscribe((employeeEntry: EmployeeEntry): void => {
      this.employeeEntryTableRow = this.myEmployeeService.getTableRows([employeeEntry])
    })
  }
}
