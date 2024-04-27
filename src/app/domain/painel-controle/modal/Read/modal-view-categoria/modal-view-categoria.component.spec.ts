import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewCategoriaComponent } from './modal-view-categoria.component';

describe('ModalViewCategoriaComponent', () => {
  let component: ModalViewCategoriaComponent;
  let fixture: ComponentFixture<ModalViewCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalViewCategoriaComponent]
    });
    fixture = TestBed.createComponent(ModalViewCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
