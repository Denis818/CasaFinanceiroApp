/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrancaPage } from './cobranca.page';

describe('CompraPage', () => {
  let component: CobrancaPage;
  let fixture: ComponentFixture<CobrancaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CobrancaPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrancaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
