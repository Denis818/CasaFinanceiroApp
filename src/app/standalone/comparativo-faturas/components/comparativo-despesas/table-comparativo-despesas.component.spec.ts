/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativoDespesasComponent } from './table-comparativo-despesas.component';

describe('ComparativoDespesasComponent', () => {
  let component: ComparativoDespesasComponent;
  let fixture: ComponentFixture<ComparativoDespesasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComparativoDespesasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativoDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
