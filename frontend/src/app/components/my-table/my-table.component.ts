import {Component, Input, OnInit} from '@angular/core';
import { TableActionButton } from "../../../interfaces/TableActionButton";

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  @Input() columns: string[] = []
  @Input() rows: string[][] = []
  @Input() actions: TableActionButton[] = []
  @Input() onClickRow = (row: string[]) => {}
  @Input() hasFilter: boolean = true
  isActionsEmpty: boolean = true
  allRows: string[][] = []
  filterValue: string = ''

  ngOnInit(): void {
    this.isActionsEmpty = this.actions.length === 0
  }

  ngOnChanges() {
    this.allRows = this.rows
  }

  filterForm() {
    this.rows = this.allRows.filter(row => row.some(cell => cell.indexOf(this.filterValue) !== -1))
  }

  clearFilterForm() {
    this.filterValue = ''
    this.rows = this.allRows
  }
}
