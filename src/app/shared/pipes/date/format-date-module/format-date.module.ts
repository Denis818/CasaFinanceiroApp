import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatDatePipe } from '../format-date/format-date.pipe';

@NgModule({
  declarations: [FormatDatePipe],
  imports: [CommonModule],
  exports: [FormatDatePipe],
  providers: [DatePipe],
})
export class FormatDateModule {}
