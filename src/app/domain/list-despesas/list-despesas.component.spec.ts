import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDespesasComponent } from './list-despesas.component';

describe('ViewDespesaModal', () => {
  let component: ListDespesasComponent;
  let fixture: ComponentFixture<ListDespesasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDespesasComponent],
    });
    fixture = TestBed.createComponent(ListDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
