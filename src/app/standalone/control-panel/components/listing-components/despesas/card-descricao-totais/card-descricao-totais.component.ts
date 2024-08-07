import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-descricao-totais',
  templateUrl: './card-descricao-totais.component.html',
  styleUrls: ['./card-descricao-totais.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class CardDescricaoTotaisComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
