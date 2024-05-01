import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMembroModal } from './create-membro.modal';

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
