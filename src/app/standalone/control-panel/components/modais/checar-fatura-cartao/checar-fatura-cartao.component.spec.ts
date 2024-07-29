import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecarFaturaCartaoComponent } from './checar-fatura-cartao.component';

describe('ChecarFaturaCartaoModal', () => {
  let component: ChecarFaturaCartaoComponent;
  let fixture: ComponentFixture<ChecarFaturaCartaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecarFaturaCartaoComponent],
    });
    fixture = TestBed.createComponent(ChecarFaturaCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
