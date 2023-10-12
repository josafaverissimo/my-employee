import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent {
  @Input() columns: string[] = []
  @Input() rows: string[][] = []
}
