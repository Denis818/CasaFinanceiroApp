import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewMembroComponent } from './modal-view-membro.component';

describe('ModalViewMembroComponent', () => {
  let component: ModalViewMembroComponent;
  let fixture: ComponentFixture<ModalViewMembroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalViewMembroComponent]
    });
    fixture = TestBed.createComponent(ModalViewMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
