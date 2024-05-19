import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriaModal } from './list-categoria.modal';

describe('ListCategoriaModal', () => {
  let component: ListCategoriaModal;
  let fixture: ComponentFixture<ListCategoriaModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCategoriaModal],
    });
    fixture = TestBed.createComponent(ListCategoriaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
