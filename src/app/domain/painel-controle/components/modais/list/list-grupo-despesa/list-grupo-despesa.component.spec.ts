import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListMembroComponent } from './list-grupo-despesa.component';

describe('ModalListMembroComponent', () => {
  let component: ModalListMembroComponent;
  let fixture: ComponentFixture<ModalListMembroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalListMembroComponent],
    });
    fixture = TestBed.createComponent(ModalListMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
