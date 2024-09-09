/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProdutoListaComprasComponent } from './create-produto-lista-compras.component';

describe('ProdutoListaComprasComponent', () => {
  let component: CreateProdutoListaComprasComponent;
  let fixture: ComponentFixture<CreateProdutoListaComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProdutoListaComprasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProdutoListaComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
