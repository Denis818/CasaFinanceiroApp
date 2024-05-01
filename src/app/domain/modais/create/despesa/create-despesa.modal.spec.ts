import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDespesaModal } from './create-despesa.modal';

describe('ModalComponent', () => {
  let component: CreateDespesaModal;
  let fixture: ComponentFixture<CreateDespesaModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDespesaModal],
    });
    fixture = TestBed.createComponent(CreateDespesaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
