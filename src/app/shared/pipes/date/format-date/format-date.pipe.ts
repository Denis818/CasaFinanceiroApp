import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate',
  pure: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: any): any {
    const datePipe = new DatePipe('pt-BR');
    return datePipe.transform(value, 'dd-MM-yyyy');
  }
}
