import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDespesaModal } from './view-despesa.modal';

describe('ViewDespesaModal', () => {
  let component: ViewDespesaModal;
  let fixture: ComponentFixture<ViewDespesaModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDespesaModal],
    });
    fixture = TestBed.createComponent(ViewDespesaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
