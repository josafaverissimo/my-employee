import { Component } from '@angular/core';
import { MyEmployeeService } from '../../services/my-employee.service';
import { EmployeeEntry } from 'src/interfaces/EmployeeEntry';

@Component({
  selector: 'app-my-employee-entries-list',
  templateUrl: './my-employee-entries-list.component.html',
  styleUrls: ['./my-employee-entries-list.component.css']
})
export class MyEmployeeEntriesListComponent {
  employeeEntriesTableColumns: string[] = ['status', 'nome', 'email', 'cpf', 'celular', 'conhecimentos']
  employeeEntriesTableRows: string[][] = []

  constructor(private myEmployeeService: MyEmployeeService) {
    this.getEmployeeEntriesRows()
  }

  private getEmployeeEntriesRows(): void {
    this.myEmployeeService.getAll().subscribe(employeesEntries => {
      this.employeeEntriesTableRows = employeesEntries.map(
        (employeeEntry: EmployeeEntry): string[] => [
          !!employeeEntry.is_valid ? "Validado" : "Não validado",
          employeeEntry.name,
          employeeEntry.email,
          employeeEntry.cpf,
          employeeEntry.phone ?? "",
          employeeEntry.knowledge.join(", ")
        ]
      )
    })
  }
}
