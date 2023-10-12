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
    /**
     * os dados de this.rows são armazenados em outro lugar para não perder todos os dados
     * quando o filtro for utilizado
     */
    this.allRows = this.rows
  }

  filterForm() {
    this.rows = this.allRows.filter( // retorna o array filtrado baseado no valor do filtro
      row => row.some( // percorre todo o array para verificar se há pelo menos um que retorne true para a função abaixo
        cell => cell.indexOf(this.filterValue) !== -1 // verifica se a linha contém o valor do filtro
      )
    )
  }

  clearFilterForm() {
    // simplesmente limpa o valor do filtro e reinicia o estado das linhas
    this.filterValue = ''
    this.rows = this.allRows
  }
}
