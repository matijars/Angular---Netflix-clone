import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'kFormat', standalone: true })
export class KFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'K';
    } else {
      return value.toFixed(0);
    }
  }
}
