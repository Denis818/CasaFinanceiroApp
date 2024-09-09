/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProdutoListaComprasComponent } from './list-produto-lista-compras.component';

describe('ProdutoListaComprasComponent', () => {
  let component: ListProdutoListaComprasComponent;
  let fixture: ComponentFixture<ListProdutoListaComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListProdutoListaComprasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProdutoListaComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
