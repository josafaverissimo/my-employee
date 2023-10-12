import { Component } from '@angular/core';
import { MyEmployeeService } from '../../services/my-employee.service';
import { EmployeeEntry } from 'src/interfaces/EmployeeEntry';

@Component({
  selector: 'app-my-employee-entries-list',
  templateUrl: './my-employee-entries-list.component.html',
  styleUrls: ['./my-employee-entries-list.component.css']
})
export class MyEmployeeEntriesListComponent {
  employeeEntriesTableColumns: string[] = []
  employeeEntriesTableRows: string[][] = []

  constructor(private myEmployeeService: MyEmployeeService) {
    this.employeeEntriesTableColumns = this.myEmployeeService.getTableColumns()

    this.getEmployeeEntriesRows()
  }

  private getEmployeeEntriesRows(): void {
    this.myEmployeeService.getAll().subscribe((employeesEntries: EmployeeEntry[]): void => {
      this.employeeEntriesTableRows = this.myEmployeeService.getTableRows(employeesEntries)
    })
  }
}
