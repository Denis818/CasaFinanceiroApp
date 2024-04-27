import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMembroComponent } from './modal-membro.component';

describe('ModalMembroComponent', () => {
  let component: ModalMembroComponent;
  let fixture: ComponentFixture<ModalMembroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMembroComponent],
    });
    fixture = TestBed.createComponent(ModalMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
