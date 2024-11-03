/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePagamentoComponent } from './create-pagamento.component';

describe('CreateRecebimentoComponent', () => {
  let component: CreatePagamentoComponent;
  let fixture: ComponentFixture<CreatePagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePagamentoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
