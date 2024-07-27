/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestaoFornecedorComponent } from './sugestao-fornecedor.component';

describe('SugestoesComprasComponent', () => {
  let component: SugestaoFornecedorComponent;
  let fixture: ComponentFixture<SugestaoFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SugestaoFornecedorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SugestaoFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
