import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemWhatsAppModal } from './mensagem-whatsapp.modal';

describe('WhatsappModal', () => {
  let component: MensagemWhatsAppModal;
  let fixture: ComponentFixture<MensagemWhatsAppModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensagemWhatsAppModal],
    });
    fixture = TestBed.createComponent(MensagemWhatsAppModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
