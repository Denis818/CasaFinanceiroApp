import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class ButtonComponent {
  @Input()
  text?: string;

  @Input()
  grownWidth: boolean = false;

  @Input()
  backgroundColor: string = '';
}
