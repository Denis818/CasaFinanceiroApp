import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemWhatsAppComponent } from './mensagem-whatsapp.component';

describe('WhatsappModal', () => {
  let component: MensagemWhatsAppComponent;
  let fixture: ComponentFixture<MensagemWhatsAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensagemWhatsAppComponent],
    });
    fixture = TestBed.createComponent(MensagemWhatsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
