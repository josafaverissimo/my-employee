import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MyEmployeeService } from "../../services/my-employee.service";
import {EmployeeEntry} from "../../../interfaces/EmployeeEntry";
import {TableActionButton} from "../../../interfaces/TableActionButton";
import {GenericResponse} from "../../../interfaces/GenericResponse";

@Component({
  selector: 'app-my-employee-entry-validate',
  templateUrl: './my-employee-entry-validate.component.html',
  styleUrls: ['./my-employee-entry-validate.component.css']
})
export class MyEmployeeEntryValidateComponent {
  employeeEntryTableColumns: string[] = []
  employeeEntryTableRow: string[][] = []
  employeeName: string = ''
  employeeEntryId: number = 0
  employeeEntryActions: TableActionButton[] = [
    {name: 'validar', onClick: () => this.validateEmployee()},
    {name: 'não validar', onClick: () => this.invalidateEmployee()}
  ]

  constructor(
    private myEmployeeService: MyEmployeeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.employeeEntryTableColumns = this.myEmployeeService.getTableColumns()

    this.setEmployeeEntryTableRow()
  }

  private changeStatusText(text: string): void {
    const FIRST_ELEMENT = 0
    const STATUS_COLUMN = 0

    this.employeeEntryTableRow[FIRST_ELEMENT][STATUS_COLUMN] = text
  }

  private validateEmployee() {
    this.myEmployeeService.validateEmployee(this.employeeEntryId, true)
      .subscribe((response: GenericResponse) => {
        if(response.success) {
          this.changeStatusText("Validado")
        }
      })
  }

  private invalidateEmployee() {
    this.myEmployeeService.validateEmployee(this.employeeEntryId, false)
      .subscribe((response: GenericResponse) => {
        if(response.success) {
          this.changeStatusText("Não validado")
        }
      })
  }

  private setEmployeeEntryTableRow(): void {
    // @ts-ignore
    const employeeName: string = this.activatedRoute.snapshot.paramMap.get('employeeName')

    this.myEmployeeService.getByEmployeeName(employeeName).subscribe((employeeEntry: EmployeeEntry): void => {
      this.employeeName = employeeEntry.name
      this.employeeEntryId = employeeEntry.id
      this.employeeEntryTableRow = this.myEmployeeService.getTableRows([employeeEntry])
    })
  }
}
