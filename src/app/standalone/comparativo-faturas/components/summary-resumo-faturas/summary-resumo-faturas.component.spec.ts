/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryResumoFaturasComponent } from './summary-resumo-faturas.component';

describe('ResumoFaturasComponent', () => {
  let component: SummaryResumoFaturasComponent;
  let fixture: ComponentFixture<SummaryResumoFaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryResumoFaturasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryResumoFaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
