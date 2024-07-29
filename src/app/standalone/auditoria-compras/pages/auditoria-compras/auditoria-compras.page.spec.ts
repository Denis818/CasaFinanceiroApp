/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenciaComprasPage } from './auditoria-compras.page';

describe('ConferenciaComprasComponent', () => {
  let component: ConferenciaComprasPage;
  let fixture: ComponentFixture<ConferenciaComprasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConferenciaComprasPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenciaComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
