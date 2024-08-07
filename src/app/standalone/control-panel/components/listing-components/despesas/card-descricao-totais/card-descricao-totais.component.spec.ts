/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardDescricaoTotaisComponent } from './card-descricao-totais.component';

describe('CardDescricaoTotaisComponent', () => {
  let component: CardDescricaoTotaisComponent;
  let fixture: ComponentFixture<CardDescricaoTotaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDescricaoTotaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDescricaoTotaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
