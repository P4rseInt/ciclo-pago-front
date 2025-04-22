import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Table } from 'primeng/table';
import { ColsModel } from '@models/modular-table/cols-model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-modular-table',
  templateUrl: './modular-table.component.html',
  styleUrls: ['./modular-table.component.scss']
})
export class ModularTableComponent implements OnInit {
  @ViewChild('dtTable') table!: Table;
  @Input() tableData: any[];
  @Input() cols: ColsModel[];

  @Output() verOutput: EventEmitter<any> = new EventEmitter();
  @Output() eliminarOutput: EventEmitter<any> = new EventEmitter();

  creacionControl = new FormControl(null);
  calculoControl = new FormControl(null);
  disponibilidadControl = new FormControl(null);
  searchControl = new FormControl(null);

  constructor() {}

  ngOnInit(): void {}

  getColumns(): ColsModel[] {
    return this.cols;
  }

  clear(dtTable: Table) {
    dtTable.clear();
    this.searchControl.setValue('');
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }

  getEstadoClass(tipo: string): string {
    switch (tipo) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  ver(element) {
    this.verOutput.emit(element);
  }

  handleDelete(element) {
    this.eliminarOutput.emit(element);
  }

  shouldShowAction(col: any, actionName: string): boolean {
    return col?.actions?.some((a: any) => a.actionName === actionName);
  }
}
