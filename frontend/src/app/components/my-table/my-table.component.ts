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
  isActionsEmpty: boolean = true

  ngOnInit(): void {
    this.isActionsEmpty = this.actions.length === 0
  }
}
