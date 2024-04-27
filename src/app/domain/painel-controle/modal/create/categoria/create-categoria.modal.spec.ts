import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoriaComponent } from './create-categoria.modal';

describe('CategoriaComponent', () => {
  let component: ModalCategoriaComponent;
  let fixture: ComponentFixture<ModalCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCategoriaComponent],
    });
    fixture = TestBed.createComponent(ModalCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
