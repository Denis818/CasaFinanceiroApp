import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoriaModal } from './view-categoria.modal';

describe('ViewCategoriaModal', () => {
  let component: ViewCategoriaModal;
  let fixture: ComponentFixture<ViewCategoriaModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCategoriaModal],
    });
    fixture = TestBed.createComponent(ViewCategoriaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
