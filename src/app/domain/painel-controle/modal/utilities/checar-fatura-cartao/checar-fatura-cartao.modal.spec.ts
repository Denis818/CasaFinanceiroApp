import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecarFaturaCartaoModalComponent } from './checar-fatura-cartao.modal';

describe('ChecarFaturaCartaoModalComponent', () => {
  let component: ChecarFaturaCartaoModalComponent;
  let fixture: ComponentFixture<ChecarFaturaCartaoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecarFaturaCartaoModalComponent]
    });
    fixture = TestBed.createComponent(ChecarFaturaCartaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
