import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMembroModal } from './create-grupo-despesa.modal';

describe('ModalMembroComponent', () => {
  let component: CreateMembroModal;
  let fixture: ComponentFixture<CreateMembroModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMembroModal],
    });
    fixture = TestBed.createComponent(CreateMembroModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
