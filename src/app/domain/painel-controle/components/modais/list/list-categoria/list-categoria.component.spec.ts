import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriaComponent } from './list-categoria.component';

describe('ListCategoriaModal', () => {
  let component: ListCategoriaComponent;
  let fixture: ComponentFixture<ListCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCategoriaComponent],
    });
    fixture = TestBed.createComponent(ListCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
