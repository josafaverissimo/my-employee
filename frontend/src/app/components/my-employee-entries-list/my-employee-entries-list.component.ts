import { Component } from '@angular/core';
import { MyEmployeeService } from '../../services/my-employee.service';
import { EmployeeEntry } from 'src/interfaces/EmployeeEntry';
import { Router } from "@angular/router";

@Component({
  selector: 'app-my-employee-entries-list',
  templateUrl: './my-employee-entries-list.component.html',
  styleUrls: ['./my-employee-entries-list.component.css']
})
export class MyEmployeeEntriesListComponent {
  employeeEntriesTableColumns: string[] = []
  employeeEntriesTableRows: string[][] = []
  bindNavigateToValidEmployeePage = (row: string[]) => {}

  constructor(
    private router: Router,
    private myEmployeeService: MyEmployeeService
  ) {
    this.employeeEntriesTableColumns = this.myEmployeeService.getTableColumns()

    this.bindNavigateToValidEmployeePage = (row: string[]) => {
      const NAME = 1
      router.navigate([`${row[NAME]}/validar`])
    }

    this.getEmployeeEntriesRows()
  }

  private getEmployeeEntriesRows(): void {
    this.myEmployeeService.getAll().subscribe((employeesEntries: EmployeeEntry[]): void => {
      this.employeeEntriesTableRows = this.myEmployeeService.getTableRows(employeesEntries)
    })
  }
}
