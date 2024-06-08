/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GraficoSugestoesEconomiaComponent } from './grafico-sugestoes-economia.component';

describe('GraficoSugestoesEconomiaComponent', () => {
  let component: GraficoSugestoesEconomiaComponent;
  let fixture: ComponentFixture<GraficoSugestoesEconomiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoSugestoesEconomiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoSugestoesEconomiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
