/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativoFaturasPage } from './comparativo-faturas.page';

describe('ComparativoFaturasPage', () => {
  let component: ComparativoFaturasPage;
  let fixture: ComponentFixture<ComparativoFaturasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComparativoFaturasPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativoFaturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
