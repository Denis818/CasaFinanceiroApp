import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDespesaComponent } from './create-despesa.modal';

describe('ModalComponent', () => {
  let component: ModalDespesaComponent;
  let fixture: ComponentFixture<ModalDespesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDespesaComponent],
    });
    fixture = TestBed.createComponent(ModalDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
