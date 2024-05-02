import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oneDecimal',
  standalone: true,
})
export class OneDecimalPipe implements PipeTransform {
  transform(value: number): string {
    return value.toFixed(1);
  }
}
