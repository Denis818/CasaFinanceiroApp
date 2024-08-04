/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GraficoTotalGrupoFaturaComponent } from './grafico-total-grupo-fatura.component';

describe('GraficoTotalGrupoFaturaComponent', () => {
  let component: GraficoTotalGrupoFaturaComponent;
  let fixture: ComponentFixture<GraficoTotalGrupoFaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoTotalGrupoFaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoTotalGrupoFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
