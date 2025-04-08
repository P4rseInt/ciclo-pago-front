import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valorNumberTramo'
})
export class ValorNumberTramoPipe implements PipeTransform {
  transform(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Reemplazar comas y convertir a número flotante
    if (typeof value === 'string') {
      value = value.replace(/,/g, ''); // Eliminar comas si existen
      value = parseFloat(value);
    }

    // Verificar si el valor es un número válido
    if (isNaN(value)) {
      return ''; // Devolver cadena vacía si no es un número
    }

    if (value >= 1000 && value < 10000) {
      return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    }

    // Formatear el número con separadores de miles
    return value.toLocaleString('es-ES', {
      maximumFractionDigits: 2, // Máximo dos decimales
      minimumFractionDigits: 2  // Forzar decimales siempre
    });
  }
}
