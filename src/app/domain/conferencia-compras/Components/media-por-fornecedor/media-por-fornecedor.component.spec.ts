/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasPorFornecedorComponent } from './media-por-fornecedor.component';

describe('SugestoesComprasComponent', () => {
  let component: DespesasPorFornecedorComponent;
  let fixture: ComponentFixture<DespesasPorFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DespesasPorFornecedorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesasPorFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
