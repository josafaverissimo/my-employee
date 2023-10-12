import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeeEntry} from "../../interfaces/EmployeeEntry";

@Injectable({
  providedIn: 'root'
})
export class MyEmployeeService {
  private api = `http://localhost:8000/api/v1`

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<EmployeeEntry[]> {
    const endpoint: string = `${this.api}/employees`

    return this.httpClient.get<EmployeeEntry[]>(endpoint)
  }

  getByEmployeeName(employeeName: string): Observable<EmployeeEntry> {
    const endpoint: string = `${this.api}/employees/${employeeName}`

    return this.httpClient.get<EmployeeEntry>(endpoint)
  }

  create(body: FormData): Observable<any> {
    const endpoint = `${this.api}/employees`

    return this.httpClient.post(endpoint, body)
  }

  getTableColumns(): string[] {
    return ['status', 'nome', 'email', 'cpf', 'celular', 'conhecimentos']
  }

  getTableRows(employeesEntries: EmployeeEntry[]): string[][] {
    return employeesEntries.map(
      (employeeEntry: EmployeeEntry): string[] => [
        employeeEntry.is_valid !== null ? "Validado" : "Não validado",
        employeeEntry.name,
        employeeEntry.email,
        employeeEntry.cpf,
        employeeEntry.phone ?? "",
        employeeEntry.knowledge.join(", ")
      ]
    )
  }
}
