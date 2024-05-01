import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecarFaturaCartaoModal } from './checar-fatura-cartao.modal';


describe('ChecarFaturaCartaoModal', () => {
  let component: ChecarFaturaCartaoModal;
  let fixture: ComponentFixture<ChecarFaturaCartaoModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecarFaturaCartaoModal]
    });
    fixture = TestBed.createComponent(ChecarFaturaCartaoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
