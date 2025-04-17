import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uf',
  standalone: true
})
export class UfPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value !== 'string') {
      value = value?.toString() ?? '';
    }
    // Reemplaza todos los puntos con comas
    return value.replace(/\./g, ',');
  }
}
