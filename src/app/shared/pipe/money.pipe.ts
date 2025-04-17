import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'money'
})
export class MoneyPipe implements PipeTransform {
  transform(valor: string | number | null | undefined): string {
    if (valor === null || valor === undefined) {
      return '';
    }

    const numero = typeof valor === 'string' ? parseFloat(valor) : valor;

    if (isNaN(numero)) {
      return '';
    }

    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numero);
  }
}
