import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyEmployeeService {
  private api = `http://localhost:8000/api/v1`

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    const endpoint = `${this.api}/employees`

    return this.httpClient.get(endpoint)
  }

  create(body: FormData): Observable<any> {
    const endpoint = `${this.api}/employees`

    return this.httpClient.post(endpoint, body)
  }
}
