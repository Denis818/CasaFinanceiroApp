import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoriaModal } from './create-categoria.modal';

describe('CategoriaComponent', () => {
  let component: CreateCategoriaModal;
  let fixture: ComponentFixture<CreateCategoriaModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCategoriaModal],
    });
    fixture = TestBed.createComponent(CreateCategoriaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
